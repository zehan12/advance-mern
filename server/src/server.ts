import app from "./app";
import config from "./config/config";
import logger from "./config/logger";

const port = config.port;

const server = app.listen(port, () => {
  logger.info(`
        ################################################
        🚀 Server listening on port: ${port} 🚀
        ################################################
    `);
});