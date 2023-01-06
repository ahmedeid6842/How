const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");

const user = require("../routes/user");
const question = require("../routes/question");
const answer = require("../routes/answer");
const error = require("../middleware/error");




module.exports = function (app, express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("tiny"));
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());

    app.get("/", (req, res, next) => {
        return res.redirect("/api-docs");
    })
    app.use("/auth", user);
    app.use("/question", question);
    app.use("/answer", answer);
    app.use(error);
}