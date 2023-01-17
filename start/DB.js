const mongoose = require("mongoose");
const { initDB } = require("../config/redisConnect")
const MongoConnection = mongoose.connect(process.env.mongoURL)
    .then(async () => {
        return await initDB();
    })
module.exports = MongoConnection;