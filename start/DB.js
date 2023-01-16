const mongoose = require("mongoose");

const MongoConnection = mongoose.connect(process.env.mongoURL)
module.exports = MongoConnection;