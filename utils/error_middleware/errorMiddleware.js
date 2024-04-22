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
        return res.status(400).json({ error: `expected username to be unique` });
    }
    if(err.name === 'MandatoryInfoNotEnteredError') {
        return res.status(400).json({ error: err.message });
    }
    if(err.name === 'UserNotFoundError') {
        return res.status(404).json({ error: err.message });
    }
    if(err.name === 'WrongPassWordError') {
        return res.status(403).json({ error: err.message });
    }
    if(err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }
    if(err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired.' });
    }
    if(err.name === 'UserNotFoundFromToken') {
        return res.status(400).json({ error: 'There was a problem with the request' });
    }
    else {
        return res.status(400).send(err.message);
    }
}

module.exports = { errorMiddleware };

