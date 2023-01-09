const swaggerJsDoc = require("swagger-jsdoc");



const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HOW REST APIs",
            version: "1.0.0",
            description: "A simple questioning api"
        }
    },
    servers: [
        {
            url: process.env.URL
        }
    ],
    apis: ["./routes/*.js"]
}

module.exports.specs = swaggerJsDoc(option);