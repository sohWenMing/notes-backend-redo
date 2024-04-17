const winston = require('winston');
const { createLogger, format, transports } = winston;
const {  combine, timestamp, json } = format;
require('winston-daily-rotate-file');
const path = require('path');
const logDir = path.resolve(__dirname, '../logs');

const errorFileRotateTransport = new transports.DailyRotateFile({
    leve: 'error',
    filename: path.join(logDir, '/errors/error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
});

const http = createLogger({
    level: 'http',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [new transports.Console({ level: 'http' })]
});

const logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.errors({ stack: true }),
                format.printf(({ timestamp, level, message, stack }) => {
                    if(stack) {
                        return `[${timestamp}] Level: ${level}\n Error Message: ${message}\n Stack: ${stack}`;
                    }
                    return `[${timestamp}] ${level}: ${message}`;
                }

                )
            )
        }),
    ]
});

const errorLogger = createLogger({
    level: 'error',
    transports: [errorFileRotateTransport]
});


module.exports = { http, logger, errorLogger };
