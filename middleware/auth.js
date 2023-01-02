const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
    //DONE: check if token was provided or not,if not return 401 status
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("no token provided");

    try {
        /**
         * DONE: validate token ,if not validated return 400 "invalid token"
         * DONE: if not valid return status 400 "invalid token "
         * DONE: if token valid return paylod of token req.user and pass the controller to the next middleware
         * */
        const decoded = jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
            if (err) return res.status(400).send("invlida token");
            req.user = decoded;
            next();
        });
    } catch (err) {
        return res.status(500).send("something went wrong")
    }
}