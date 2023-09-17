import winston from 'winston';
const { combine, timestamp, json, colorize } = winston.format;

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'info',
//   format: combine(timestamp(), json()),
//   transports: [new winston.transports.Console()],
// });

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    timestamp(),
    colorize(),
    winston.format.splat(),
    winston.format.printf(({ level,timestamp, message }) => `${level} ${timestamp}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

export default logger;