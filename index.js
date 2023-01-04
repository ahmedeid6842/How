require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("./start/logginError")();
require("./start/sessionConfig")(app);
require("./start/swaggerConfig")(app);
require("./start/routes")(app,express);

const port = process.env.PORT || 3000;
mongoose.connect(process.env.mongoURL)
    .then(() => {
        app.listen(port, console.log(`listening on port ${port}`));
    })
