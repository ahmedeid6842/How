const express = require("express");
const auth = require("../middleware/auth");
const route = express.Router();

const Answer = require("../controllers/answer");

/**
 * @swagger
 * tags:
 *  name: Answers
 *  description: this is question APIs
 */

/**
 * @swagger 
 * /answer/{questionId}:
 *  post:
 *      summary: add a new answer, you must be authenticated 
 *      tags : [Answers]
 *      parameters:
 *          - in: header
 *            name: x-auth-token
 *            schema:
 *              type: string
 *            required: true
 *            description: the user token, for authentication
 *          - in: path
 *            name: questionId
 *            schema:
 *              type: string
 *            required: true
 *            description: the question id you want to add answer to
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          answer:
 *                              type: string
 *                              description: the question title                       
 *      responses:
 *          200:
 *              description: the question you query
 *          400:
 *              description : the request was invalid check you body
 *          404:
 *              description : no question found with that id  
 */

/**
 * @swagger 
 * /answer/{questionId}/{answerId}:
 *  post:
 *      summary: like answer in question by using question id and answer if
 *      tags : [Answers]
 *      parameters:
 *          - in: header
 *            name: x-auth-token
 *            schema:
 *              type: string
 *            required: true
 *            description: the user token, for authentication
 *          - in: path
 *            name: questionId
 *            schema:
 *              type: string
 *            required: true
 *            description: the question id that contain answer you want to like
 *          - in: path
 *            name: answerId
 *            schema:
 *              type: string
 *            required: true
 *            description: the answer id you want to like                  
 *      responses:
 *          200:
 *              description: the question you query
 *          404:
 *              description : answer of question not found 
 */

/**
 * @swagger 
 * /answer/{questionId}/{answerId}:
 *  delete:
 *      summary: delete answer you submit by question id and answer id
 *      tags : [Answers]
 *      parameters:
 *          - in: header
 *            name: x-auth-token
 *            schema:
 *              type: string
 *            required: true
 *            description: the user token, for authentication
 *          - in: path
 *            name: questionId
 *            schema:
 *              type: string
 *            required: true
 *            description: the question id that contain answer you want to like
 *          - in: path
 *            name: answerId
 *            schema:
 *              type: string
 *            required: true
 *            description: the answer id you want to like                  
 *      responses:
 *          200:
 *              description: the question you query
 *          404:
 *              description : answer of question not found 
 */

route.post("/:questionId", auth, Answer.newAnswer);
route.post("/:questionId/:answerId", auth, Answer.likeAnswer);
route.delete("/:questionId/:answerId", auth, Answer.deleteAnswer);

module.exports = route;