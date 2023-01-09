require("dotenv").config();
require("express-async-errors");
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

require("./start/logginError")();
require("./config/passport")();
require("./start/routes")(app, express);


const sslserver = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', "key.pem")),
        cert : fs.readFileSync(path.join(__dirname,"cert","cert.pem"))
    },
    app
)
mongoose.connect(process.env.mongoURL)
    .then(() => {
        sslserver.listen(port, console.log(`listening on port ${port}`));
    })
