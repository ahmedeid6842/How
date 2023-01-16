require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const MongoConnection = require("./start/DB");

const app = express();
const port = process.env.PORT || 3000;

require("./start/logginError")();
require("./config/passport")();
require("./start/routes")(app, express);




MongoConnection.then(() => {
    app.listen(port, console.log(`listening on port ${port}`));
})
