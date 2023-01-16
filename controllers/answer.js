const { Question, validateAnswer } = require("../models/question")

module.exports.newAnswer = async (req, res) => {
    //DONE:user must be authenticated

    //DONE:validate answer body
    const { error } = validateAnswer(req.body, "insert");
    if (error) return res.status(400).send(error.message);
    //DONE: check if question found or not, not? : return 404 
    let question = await Question.findById(req.params.questionId);
    if (!question) return res.status(404).send("no question found with that id");

    //DONE: check if the answer not submitted before 
    let checkUniqueAnser = question.answers.every((element) => element.answer !== req.body.answer)
    if (checkUniqueAnser === false) return res.status(400).send("this answer already exist");

    //DONE: save the answer
    req.body.userName = req.user.userName;
    question.answers.push(req.body);
    await question.save();

    return res.send("you answer submitted succesfully");
}

module.exports.deleteAnswer = async (req, res) => {
    //DONE: must be authenticated

    //DONE: if question or answer not found return 404
    let question = await Question.findOne({ _id: req.params.questionId });
    if (!question) return res.status(404).send("no question found with that id");

    for (let answerIndex in question.answers) {
        if (String(question.answers[answerIndex]._id) === req.params.answerId && question.answers[answerIndex].userName === req.user.userName) {
            question.answers.splice(answerIndex, 1);
            await question.save();
            return res.send("answer deleted succesfully");
        }
    }
    return res.status(404).send("no answer found");
}

module.exports.likeAnswer = async (req, res) => {
    let question = await Question.findOne({ _id: req.params.questionId });
    if (!question) return res.status(404).send("no question found with that id");

    for (let answerIndex in question.answers) {
        if (String(question.answers[answerIndex]._id) === req.params.answerId) {
            question.answers[answerIndex].likes++;
            await question.save();
            return res.send("answer liked succesfully");
        }
    }
    return res.status(404).send("no answer found");
}