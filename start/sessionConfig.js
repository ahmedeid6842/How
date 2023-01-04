const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//DONE: create a new mongo store, to store our session 
const store = new MongoDBStore({
    uri: process.env.mongoURL,
    collection: "sessions"
})

//DONE: set the secret in environment varialbes 
//DONE: set the session configuration 
module.exports = (app) => {
    app.use(session({
        name: "sessionID",
        saveUninitialized: false,
        secret: process.env.sessionSecret,
        resave: false,
        cookie: {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV == 'production' ? true : false,
            maxAge: 3 * 24 * 60 * 60 * 1000 // three day
        },
        store
    }))
}
