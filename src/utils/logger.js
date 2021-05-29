const winston = require('winston');

const outputFormat = winston.format.printf(
  (info) => `[${info.level}] ${info.label} ${info.message}`
);

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.label({ label: 'Express ::' })
);

const logger = winston.createLogger({
  level: 'debug',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: 'app.log',
      format: outputFormat,
    }),
    new winston.transports.Console({
      format: outputFormat,
    }),
  ],
});

logger.stream = {
  write(message) {
    const data = JSON.parse(message);
    const output = `${data.method} ${data.status} ${data.url} ${data.body} ${data.time}`;
    if (data.status < 299) {
      logger.info(output);
    } else if (data.status < 399) {
      logger.warn(output);
    } else {
      logger.error(output);
    }
  },
};

module.exports = logger;
