const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");



module.exports = (app) => {
    
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

    const specs = swaggerJsDoc(option);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}