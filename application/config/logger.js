const winston = require('winston');
const {splat, combine, timestamp, printf} = winston.format;


const options = {
    file: {
        level: 'info',
        filename: 'logs/app.log',
        handleExceptions: true,
    }
    ,
    console: {
        level: 'debug',
        handleExceptions: true,
        colorize: true
    },
};

const myFormat = printf(({timestamp, level, message, meta}) => {
    return `Timestamp : ${timestamp} ; Level: ${level} ; Message: ${message} ; ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        splat(),
        myFormat
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;