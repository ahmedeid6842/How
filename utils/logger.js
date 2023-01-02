//DONE: use winston for loggin error

const winston = require("winston");

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "errors.log" })
    ]
})

module.exports = logger;