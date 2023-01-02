const mongoose = require("mongoose");
const Joi = require("joi");


//DONE: create mongoose question schema
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 10,
        maxlength: 255,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    author: {
        type: String,
    },
    answers: [{
        userName: {
            type: String,
            ref: "User"
        },
        answer: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        }
    }]
})


//DONE: new question validate
function validateQuestion(question, operation) {
    let schema;
    if (operation === "insert") {
        schema = Joi.object({
            title: Joi.string().min(5).max(255).trim().required(),
            description: Joi.string().trim()
        })
    } else if (operation === "update") {
        schema = Joi.object({
            title: Joi.string().min(5).max(255).trim(),
            description: Joi.string().trim()
        })
    }
    return schema.validate(question);
}


//DONE: new answer validate
function validateAnswer(answer, operation) {
    let schema;
    if (operation === "insert") {
        schema = Joi.object({
            answer: Joi.string().trim().required()
        })
    } else if (operation === "update") {
        schema = Joi.object({
            answer: Joi.string().trim()
        })
    }
    return schema.validate(answer);
}

module.exports.Question = mongoose.model("Question", questionSchema);
module.exports.validateQuestion = validateQuestion;
module.exports.validateAnswer = validateAnswer;










