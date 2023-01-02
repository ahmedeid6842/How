const bcrypt = require("bcrypt");
const { User, registerValidate, loginValidate } = require("../models/user")

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

    //DONE: add user to users collection and return 200 status with token 
    user = new User({
        userName,
        email,
        password
    })
    await user.save();
    const token = user.createAuthToken();
    return res.header("x-auth-token", token).send("register successfully");
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

    //DONE: if password correct return token
    const token = user.createAuthToken();
    return res.header("x-auth-token",token).send(`welcome back ${user.userName}`);

}