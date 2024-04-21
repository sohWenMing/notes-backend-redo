const { errorLogger, logger } = require('../logging/logger');

function logErrorToFile(err) {
    errorLogger.error(err.message, { timeStamp: new Date().toISOString(), type: err.name, stack: err.stack });
}
function logErrorToConsole(err) {
    logger.error(err.message, { timeStamp: new Date().toISOString(), type: err.name });
}

function errorMiddleware(err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') {
        logErrorToConsole(err);
        logErrorToFile(err);
    }
    if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        res.status(400).json({ error: `expected username to be unique` });
        return;
    }
    if(err.name === 'MandatoryInfoNotEnteredError') {
        res.status(400).json({ error: err.message });
    }
    if(err.name === 'UserNotFoundError') {
        res.status(404).json({ error: err.message });
    }
    if(err.name === 'WrongPassWordError') {
        res.status(403).json({ error: err.message });
    }

    else {
        res.status(400).send(err.message);
    }
}

module.exports = { errorMiddleware };

