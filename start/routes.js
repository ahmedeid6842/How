const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const swaggerUI = require("swagger-ui-express");


const user = require("../routes/user");
const question = require("../routes/question");
const answer = require("../routes/answer");
const error = require("../middleware/error");
const { specs } = require("../config/swagger");
const { session } = require("../config/session");




module.exports = function (app, express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("tiny"));
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(session)
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    app.get("/", (req, res, next) => {
        return res.redirect("/api-docs");
    })
    app.use("/auth", user);
    app.use("/question", question);
    app.use("/answer", answer);
    app.use(error);
}