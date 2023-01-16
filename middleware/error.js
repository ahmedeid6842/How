//DONE: internal server error with express-async-erros

const logger = require("../utils/logger");

module.exports = async (error, req, res, next) => {
    console.log(error);
    console.log(`${Date.now()} error occured`);
    logger.log({
        level: "error",
        message: error.stack
    })

    return res.status(500).send("something went wrong");
}