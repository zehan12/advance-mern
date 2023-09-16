require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 4200,
    db: {
        url: process.env.MONGO_URI,
        password: process.env.DATABASE_PASSWORD
    },
}
console.log(process.env.NODE_ENV)

export default config;