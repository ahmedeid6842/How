//this middleware is for testing if the user are logged in so he can't logged in again until he lgout
//it's very useful because if the user are logged in and logged in again with different username the sessionId will be overwriten
module.exports = async (req, res, next) => {
    if (req.session.userName) {
        return res.status(400).send(`you already logged In with user named : ${req.session.userName}`)
    }
    next();
}

