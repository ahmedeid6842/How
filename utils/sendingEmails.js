const nodeMailer = require("nodemailer");

module.exports = function (from, to, subject, text) {
    return new Promise((resolve, reject) => {
        const transport = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.emailPassword
            }
        });
        const configs = {
            from,
            to,
            subject,
            html:text
        };
        transport.sendMail(configs, (error, info) => {
            if (error) return reject({ message: "an error occured", error });
            return resolve({ message: "email sending succesfully", info })
        })
    })
}