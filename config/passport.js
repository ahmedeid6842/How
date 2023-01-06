const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models/user");
passport.serializeUser((user, done) => {
    done(null, user.userName);
})
passport.deserializeUser(async (userName, done) => {
    const user = await User.findOne({ userName });
    done(null, user);
})

module.exports = function () {
    passport.use(
        new GoogleStrategy({
            callbackURL: "/auth/google/redirect",
            clientID: process.env.googleClientID,
            clientSecret: process.env.googleClientSecret
        }, async (accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({ userName: profile.displayName });
            if (!user) {
                user = new User({
                    userName: profile.displayName,
                    userType: "Google",
                    email: profile.emails[0].value,
                    platFormID: profile.id
                })
                await user.save();
            }
            done(null, user);
        })
    )
}