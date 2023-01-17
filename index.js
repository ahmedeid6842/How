require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

const { initDB } = require("./config/redisConnect")
const mongoConnection = require("./start/DB");

const app = express();
const port = process.env.PORT || 3000;

require("./utils/cache");
require("./start/logginError")();
require("./config/passport")();
require("./start/routes")(app, express);




mongoConnection
    .then(() => {
        app.listen(port, console.log(`connected on port ${port}`));
    })
