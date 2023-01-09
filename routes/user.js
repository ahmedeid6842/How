const express = require("express");

const User = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isLoggedIn = require("../middleware/isLoggedIn");
const isValidToken = require("../middleware/validateToken");
const passport = require("passport");

const route = express.Router();
/**
 * @swagger
 * tags:
 *  name: login & signup
 *  description: login and signup APIs
 */

/**
 * @swagger 
 * /auth/register:
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
 *                  Set-Cookie:
 *                      schema:
 *                          type: string
 *                      description: containing sessionId for authentication
 *                      example: sessionID=s3%akdfjldskfjdf.ckjsdlf; path=/;sameSite=strict;secure=true
 *          400:
 *              description : the request was invalid check you body
 *                      
 */

/**
 * @swagger 
 * /auth/login:
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
 *                  Set-Cookie:
 *                      schema:
 *                          type: string
 *                      description: containing sessionId for authentication
 *                      example: sessionID=s3%akdfjldskfjdf.ckjsdlf; path=/;sameSite=strict;secure=true
 *          400:
 *              description : the request was invalid check you body
 *          404:
 *              description : email or user name wasn't found or wrong password
 *                      
 */

/**
 * @swagger 
 * /auth/logout:
 *  get:
 *      summary: logout the user  
 *      tags : [login & signup]
 *      responses:
 *          200:
 *              description: sucessfully logged our
 *          500:
 *              description : something went wrong
 *                      
 */

/**
 * @swagger 
 * /auth/reset-password:
 *  post:
 *      summary: asking to reset password 
 *      tags : [login & signup]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: email that  want to reset password    
 *      responses:
 *          200:
 *              description: succesfully send email 
 *          400:
 *              description : the request was invalid check you body
 *          404:
 *              description : email or user name wasn't found or wrong password
 *                      
 */



/**
 * @swagger 
 * /auth/reset-password/{token}:
 *  post:
 *      summary: set a new password by providing token that sent to your email 
 *      tags : [login & signup]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          password:
 *                              type: string
 *                              description: the new password
 *      parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: token that sent to your email to use 
 *      responses:
 *          200:
 *              description: you password update sucesfully
 *          400:
 *              description : the request was invalid check you body
 *          404:
 *              description : user not found
 *                      
 */

/**
 * @swagger 
 * /auth/google:
 *  get:
 *      summary: login or register the user using google account
 *      tags : [login & signup]
 *      description: Click here [/auth/google](/auth/google) for Google Authentication
 *      responses:
 *          200:
 *              description: sucessfully logged our
 *          500:
 *              description : something went wrong
 *                      
 */

route.get("/google", isLoggedIn, passport.authenticate("google", {
    scope: ['profile', 'email']
}));
route.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    return res.redirect("/");
})

route.post("/register", isLoggedIn, User.register);
route.post("/login", isLoggedIn, User.login);
route.post("/reset-password", User.postResetPassword)
route.get("/reset-password/:token", isValidToken, User.getResetPassword)
route.post("/reset-password/:token", isValidToken, User.setNewPassword)
route.get("/logout", isAuth, User.logout);
module.exports = route;