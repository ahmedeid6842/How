const express = require("express");

const User = require("../controllers/user");

const route = express.Router();
/**
 * @swagger
 * tags:
 *  name: login & signup
 *  description: login and signup APIs
 */

/**
 * @swagger 
 * /user/register:
 *  post:
 *      summary: user sign-up
 *      tags : [login & signup]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          userName:
 *                              type: string
 *                              description: the user uniques user name
 *                          email:
 *                              type: string
 *                              description : the user's email 
 *                          password:
 *                              type: string
 *                              description : the user's password contain[1 upper case , 1 lower case , 6 numberic , 1 special]
 *      responses:
 *          200:
 *              description: sucessfully signed up
 *              headers:
 *                  x-auth-token:
 *                      schema:
 *                          type: string
 *                      description: header you will use in authentication
 *          400:
 *              description : the request was invalid check you body
 *                      
 */

/**
 * @swagger 
 * /user/login:
 *  post:
 *      summary: login user 
 *      tags : [login & signup]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          userName:
 *                              type: string
 *                              description: you can pass you userName or email     
 *                          password:
 *                              type: string
 *                              description : enter you password
 *      responses:
 *          200:
 *              description: sucessfully logged in
 *              headers:
 *                  x-auth-token:
 *                      schema:
 *                          type: string
 *                      description: header you will use in authentication
 *          400:
 *              description : the request was invalid check you body
 *          404:
 *              description : email or user name wasn't found or wrong password
 *                      
 */

route.post("/register", User.register);
route.post("/login", User.login);

module.exports = route;