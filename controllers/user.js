const bcrypt = require("bcrypt");
const { query } = require("express");
const { default: mongoose } = require("mongoose");
const { User, registerValidate, loginValidate, NewPasswordValidate } = require("../models/user");
const logger = require("../utils/logger");
const sendingEmails = require("../utils/sendingEmails");

module.exports.register = async (req, res) => {
    let { userName, email, password } = req.body;
    //DONE: validate request body , return 400 status if reques was bad
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.message);

    //DONE: check if email and userName are uniques, return 400 status if email or user name found
    let user = await User.findOne().or([{ userName }, { email }]);
    if (user && user.email === email) return res.status(400).send("this email already in use");
    if (user && user.userName === userName) return res.status(400).send("this userName already in use");

    //DONE:hash the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    //DONE: add user to users collection and return 200 status with session 
    user = new User({
        userName,
        email,
        password,
        userType: "Local"
    })
    await user.save();
    user.createSession(req);
    return res.send("register successfully");
}

module.exports.login = async (req, res) => {
    //DONE: validate request body, return 400 if bad request
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error.message);

    //DONE: check if email exist or userName, return 404 if email not found
    const user = await User.findOne()
        .or([{ email: req.body.userName }, { userName: req.body.userName }]);
    if (!user) return res.status(404).send("username or email not found or wrong password");

    //DONE: check if password is wrong, return 404 if password wrong
    const verified = await bcrypt.compare(req.body.password, user.password);
    if (!verified) return res.status(404).send("username or email not found or wrong password");

    //DONE: if password correct create session 
    user.createSession(req);
    return res.send(`welcome back ${user.userName}`);

}

module.exports.logout = async (req, res) => {
    //DONE: destroy the session that is store in our db by express-session package 
    req.session.destroy(err => {
        if (err) {
            logger.log({
                level: "error",
                error: err.stack
            })
            return res.status(500).send("you aren't logg out")
        }
    })

    //DONE: clear the cookie that store the session in client-side
    res.status(200).clearCookie("sessionID").send("you are logged out")

}

module.exports.postResetPassword = async (req, res) => {
    //DONE: validate request body that contain email 
    const { error } = NewPasswordValidate(req.body, "asking");
    if (error) return res.status(400).send(error.message);

    //DONE: validate if email exists in your database, it itsn't 404 status not found
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("email doesn't exists");

    //DONE: create a token that will be send to user email
    const token = user.createResetPasswordToken();

    //DONE: send email by using "sendingEmail" function to user with link that contain a jwt for reset password 
    await sendingEmails(process.env.email, user.email, "reset your how password",
        `
        <p> You request a new password </p>
        <p> Click this <a href=${process.env.URL}/user/reset-password/${token}> to reset your password</p>
        <p> in case you are using swagger don't click the linke provide that token in the header of [post /reset-password/:token] : ${token} </p>
        `
    )
    return res.status(200).send("check your email")
}

module.exports.getResetPassword = async (req, res) => {
    res.send(`<html>
                <body>
                <h2>reset password</h2>
                <form action="/user/reset-password/${req.params.token}" method="post">
                    <label for="fname">you new password:</label><br>
                    <input type="text" id="fname" name="password" value="password"><br>
                    <input type="submit" value="Submit">
                </form> 
                <p>If you click the "Submit" button, then you change your password</p>
                </body>
            </html>`
    );
}

module.exports.setNewPassword = async (req, res) => {

    //DONE: validate password plaintext
    const { error } = NewPasswordValidate(req.body, "updating");
    if (error) return res.status(400).send(`${error.message}`);

    //DONE: check if user exist , we do this step cause in case of user are deleted after sending token
    let user = await User.findOne({ userName: req.user.userName });
    if (!user) return res.status(404).send(`can't find this user:${req.user.userName}`);

    //DONE: create & set a new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    //DONE: clear cookie and destroy session if exist 
    res.status(200).clearCookie("sessionID").send("your password changed correctly")
}

module.exports.follow = async (req, res) => {
    //TODO: solve duplicated followers and following for users , user can follow the same person more than once

    //DONE: commit the two operations as tranaction
    const session = await User.startSession();
    session.startTransaction();

    //DONE: find follower user and push new one
    let followerUser = await User.findOneAndUpdate({ userName: req.body.followUserName }, { $addToSet: { followers: { userName: req.user.userName } } }, { session });
    if (!followerUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send(`no user with that name ${req.body.followUserName}`);
    }

    //DONE: find following user and push new one , prefered to do DB all operation on it's side
    console.log(req.user._id);
    let followingUser = await User.findByIdAndUpdate(req.user._id, { $addToSet: { following: { userName: req.body.followUserName } } }, { session });
    if (!followingUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send(`no user with that name ${req.body.followUserName}`)
    };

    await session.commitTransaction();
    session.endSession();
    return res.send("done");
}

module.exports.getFollow = async (req, res) => {
    //TODO: get followers   
    let query = {};
    if (req.query.followers) {
        query.projection = "followers"
        query.selection = { userName: req.query.followers || null }
    } else if (req.query.following) {
        query.projection = "following"
        query.selection = { userName: req.query.following || null }
    } else {
        //DONE: in case no query provided
        return res.send([]);
    }

    console.log(query);
    let result = await User.aggregate([
        { $match: { userName: query.selection.userName } },
        {
            $project: {
                [query.projection]: 1
            }
        }
    ])
    return res.send(result);
}

module.exports.unfollow = async (req, res) => {
    // DONE: adding transactions
    const session = await User.startSession();
    session.startTransaction();

    // DONE: remove query userName req.query.unfollow from current logged in user following
    let followingUser = await User.findOneAndUpdate(
        { userName: req.user.userName },
        {
            $pull: {
                following: { userName: req.query.userName }
            }
        }
    );

    if (!followingUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send(`no user with that name ${req.user.userName}`);
    }

    // DONE: remove logged-in user from followers of query userName
    let followerUser = await User.findOneAndUpdate(
        { userName: req.query.userName },
        {
            $pull: {
                followers: { userName: req.user.userName }
            }
        }
    )

    if (!followerUser) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send(`no user with that name ${req.query.userName}`);
    }
    
    await session.commitTransaction();
    session.endSession();

    return res.send("done");

}