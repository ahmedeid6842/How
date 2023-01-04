require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");


const user = require("./routes/user");
const question = require("./routes/question");
const answer = require("./routes/answer");
const error = require("./middleware/error");
const logger = require("./utils/logger");




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

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HOW REST APIs",
            version: "1.0.0",
            description: "A simple questioning api"
        }
    },
    servers: [
        {
            url: process.env.URL
        }
    ],
    apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(option);


const app = express();

app.use(express.json());
require("./start/sessionConfig")(app);
app.use(morgan("tiny"));
app.use(helmet());
app.use(compression());
app.use(cors());

app.get("/", (req, res,next) => {
    return res.redirect("/api-docs");
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/user", user);
app.use("/question", question);
app.use("/answer", answer);
app.use(error);

const port = process.env.PORT || 3000;
mongoose.connect(process.env.mongoURL)
    .then(() => {
        app.listen(port, console.log(`listening on port ${port}`));
    })
