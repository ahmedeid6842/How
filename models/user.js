const mongoose = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const jwt = require("jsonwebtoken");

const joiPassword = Joi.extend(joiPasswordExtendCore);


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () { // required only if user use our local register
            return this.platFormID === "Local"
        },
        minlength: 5,
        maxlength: 255
    },
    followers: [{
        userName: {
            type: String,
            required: true,
        }
    }],
    following: [{
        userName: {
            type: String,
            required: true,
        }
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    userType: { // determine user register using external platform or local
        type: String,
        enum: ["Google", "Local"],
        required: true
    },
    platFormID: {
        type: String
    }
})


userSchema.methods.createSession = function (req) {
    //DONE: method to create user session and store it
    req.session.passport = {}
    req.session.passport.user = this.userName;
}

userSchema.methods.createResetPasswordToken = function (req) {
    //DONE: method to create a token that will be used when reseting password
    return jwt.sign({ userName: this.userName }, process.env.jwtSecret, { expiresIn: "1h" });
}

function registerValidate(user) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(6)
            .noWhiteSpaces()
            .required()
    })
    return schema.validate(user);
}

function loginValidate(user) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        password: Joi.string().required()
    })
    return schema.validate(user);
}

function NewPasswordValidate(body, method) {
    if (method === "asking") { // when user asking for a new password, must provide email
        const schema = Joi.object({
            email: Joi.string().email().required(),
        })
        return schema.validate(body);
    } else if (method === "updating") { // when user go the change passord process and need to update password
        const schema = Joi.object({
            password: joiPassword
                .string()
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(6)
                .noWhiteSpaces()
                .required()
        })
        return schema.validate(body);
    }
}

module.exports.User = mongoose.model("User", userSchema);
module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
module.exports.NewPasswordValidate = NewPasswordValidate;