//DONE: use winston for loggin error

const winston = require("winston");
require("winston-mongodb")

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.MongoDB({ db: process.env.mongoURL, collection: "logs",cappedMax:100 })
    ]
})

module.exports = logger;