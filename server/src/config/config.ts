import { DEVELOPMENT, PRODUCTION } from "../constants/general";

require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4200,
  db: {
    url:
      process.env.NODE_ENV === PRODUCTION
        ? process.env.MONGO_URL
        : "mongodb://localhost:27017/mern",
    password: process.env.DATABASE_PASSWORD,
  },
};
// console.log(config);

export default config;
