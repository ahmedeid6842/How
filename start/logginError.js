const logger = require("../utils/logger");



module.exports = function () {
    //DONE: uncaught execption handling
    process.on("uncaughtException", (ex) => {
        console.log(ex)
        logger.log({
            level: "error",
            message: ex.message
        })
        process.exit(1)
    })


    //DONE: unhandeled promise rejections
    process.on("unhandledRejection", (ex) => {
        console.log(ex)
        logger.log({
            level: "error",
            message: ex.message
        })
        process.exit(1)
    })  
}

