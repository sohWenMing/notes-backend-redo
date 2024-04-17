const { errorLogger, logger } = require('../logging/logger');

function logErrorToFile(err) {
    errorLogger.error(err.message, { timeStamp: new Date().toISOString(), type: err.name, stack: err.stack });
}
function logErrorToConsole(err) {
    logger.error(err.message, { timeStamp: new Date().toISOString(), type: err.name, stack: err.stack });
}

function errorMiddleware(err, req, res, next) {
    if (process.env.NODE_ENV === 'test') {
        logErrorToConsole(err);
        logErrorToFile(err);
    };
    if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        res.status(400).json({error: `expected username to be unique`});
        return;
    }
    else {
        res.status(400).send(err.message);
    }
}

module.exports = { errorMiddleware };

