const mongoose = require("mongoose");
const { Question, validateQuestion } = require("../models/question");
const { User } = require("../models/user");

module.exports.newQuestion = async (req, res) => {
    //DONE: user must be authenticated

    //DONE: validate request body, if not correct return status 400
    const { error } = validateQuestion(req.body, "insert");
    if (error) return res.status(400).send(error.message);

    //DONE:check this question is unique 
    let question = await Question.findOne({ title: req.body.title });
    if (question) return res.status(400).send("this question already asked before");

    //DONE: create a new question body object with authenticated user and save it 
    question = new Question({
        title: req.body.title,
        description: req.body.description,
        author: req.user.userName
    });


    await question.save();
    //DONE: save question to user questions array
    await User.updateOne({ userName: req.user.userName }, {
        $push: { questions: question._id },
    });

    return res.send("your question submitted succesfully ");
}


module.exports.getQuestion = async (req, res) => {
    //DONE: find a question by id and populate the user and answers
    const question = await Question.findById(req.params.id);
    //DONE: if question not found return 404
    if (!question) return res.status(404).send("no question found");
    //DONE: if the question found return it 
    return res.send(question);
}


module.exports.updateQuestion = async (req, res) => {
    //DONE: must be autheticated

    //DONE: validate req body
    const { error } = validateQuestion(req.body, "update")
    if (error) return res.status(400).send(error.message);

    //DONE: find the question and user must be owner
    const question = await Question
        .findOneAndUpdate(
            {
                author: req.user.userName,
                _id: req.params.id
            },
            {
                $set: req.body
            }, { new: true }
        )
    //DONE: if not found return 404 
    if (!question) return res.status(404).send("not question with that id found");

    //DONE: return the updated question
    return res.send(question);
}

module.exports.deleteQuestion = async (req, res) => {
    //DONE: must be authenticated

    //DONE: if question not found return 404
    let question = await Question.findOneAndDelete({ _id: req.params.id, author: req.user.userName });
    if (!question) return res.status(404).send("no question with that ID found")
    return res.send("question deleted succesfully");
}