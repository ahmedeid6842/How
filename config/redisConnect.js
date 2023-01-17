const redis = require("redis")

let client;
const initDB = async function () {
    //DONE: set up connection with redis
    return new Promise(async (resolve, reject) => {
        if (client) {
            console.log("redis database is already connected");
            resolve(client);
        }
        client = await redis.createClient(process.env.redisURL)
        await client.connect();
        resolve(client);
    })
}

const getDB = () => {
    //DONE: get client you just set 
    if (!client) {
        throw Error("DataBase not intialized")
    }
    return client;
}

module.exports = {
    initDB,
    getDB
}