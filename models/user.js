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
        required: true,
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
    }]
})


userSchema.methods.createSession = function (req) {
    //DONE: method to create user session and store it
    req.session.userName = this.userName;
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

module.exports.User = mongoose.model("User", userSchema);
module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;