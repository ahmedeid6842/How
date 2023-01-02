const express = require("express");
const route = express.Router();
const Question = require("../controllers/question");
const auth = require("../middleware/auth");


/**
 * @swagger
 * components:
 *  schemas:
 *      Question:
 *          type: object
 *          required:
 *              - title 
 *          properties:
 *              _id:
 *                  type: string
 *                  description : the auto generated question id
 *              title:
 *                  type: string
 *                  description : the title of the qeuestion
 *              description: 
 *                  type: string
 *                  description: the description of the question
 *              author:
 *                  type: string
 *                  description: the author of the question
 *              answers:
 *                  type: array
 *                  description: the answers of this question
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description : the auto generated answer id
 *                          userName:
 *                              type: string
 *                              description : the author of that answer
 *                          answer:
 *                              type: string
 *                              description: question's answer
 *                          likes:
 *                              type: integer
 *                              description: the number of likes
 */


/**
 * @swagger
 * tags:
 *  name: Questions
 *  description: this is question APIs
 */

/**
 * @swagger 
 * /question/{id}:
 *  get:
 *      summary: return a question by it's id
 *      tags : [Questions]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the question id
 *      responses:
 *          200:
 *              description: the question you query
 *              content:
 *                  application/json : 
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Question'
 *          404:
 *              description: the question wasn't found
 *          
 *                      
 */

/**
 * @swagger 
 * /question:
 *  post:
 *      summary: add a new question, you must be authenticated 
 *      tags : [Questions]
 *      parameters:
 *          - in: header
 *            name: x-auth-token
 *            schema:
 *              type: string
 *            required: true
 *            description: the user token, for authentication
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: the question title
 *                          description:
 *                              type: string
 *                              description : the question description 
 *      responses:
 *          200:
 *              description: the question you query
 *          400:
 *              description : the request was invalid check you body
 *                      
 */


/**
 * @swagger 
 * /question/{id}:
 *  put:
 *      summary: update existing question, you must be authenticated 
 *      tags : [Questions]
 *      parameters:
 *          - in: header
 *            name: x-auth-token
 *            schema:
 *              type: string
 *            required: true
 *            description: the user token, for authentication
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the question id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: the question title
 *                          description:
 *                              type: string
 *                              description : the question description 
 *      responses:
 *          200:
 *              description: the question you query
 *              content:
 *                  application/json : 
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Question'
 *          400:
 *              description : the request was invalid check you body
 *          404:
 *              description : the question wasn't found                    
 */

/**
 * @swagger 
 * /question/{id}:
 *  delete:
 *      summary: delete a question, you must be authenticated 
 *      tags : [Questions]
 *      parameters:
 *          - in: header
 *            name: x-auth-token
 *            schema:
 *              type: string
 *            required: true
 *            description: the user token, for authentication
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the question id
 *      responses:
 *          200:
 *              description: the question you update
 *          404:
 *              description : the question wasn't found
 *          
 *                      
 */
route.post("/", auth, Question.newQuestion);
route.get("/:id", Question.getQuestion);
route.put("/:id", auth, Question.updateQuestion);
route.delete("/:id", auth, Question.deleteQuestion);


module.exports = route;