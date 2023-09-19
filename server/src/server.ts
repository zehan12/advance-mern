import app from "./app";
import config from "./config/config";
import connectDB from "./config/db";
import logger from "./config/logger";

const port = config.port;

connectDB();

const server = app.listen(port, () => {
  logger.info(`
        ################################################
        🚀 Server listening on port: ${port} 🚀
        ################################################
    `);
});

// Make sure we are running node 18+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 16 || (major === 16 && minor <= 0)) {
  console.log(
    "Please go to nodejs.org and download version 18 or greater. 👌\n "
  );
  process.exit();
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
