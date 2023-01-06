const { User } = require("../models/user")
module.exports = async (req, res, next) => {
    //DONE: check if the session cookie are provided or not
    if (!req.session.passport.user) {
        return res.status(401).send("your aren't logged in")
    }

    /**
     * DONE: if true then the user is authenticated, pass the controll to the next middleware
     * DONE: check if user exists,cause maybe after assigning the session the user was deleted from our db  
     */

    let user = await User.findOne({ userName: req.session.passport.user });
    if (!user) return res.status(404).send("user not found")
    req.user = user
    next();
}