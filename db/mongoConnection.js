const mongoose = require('mongoose');
const { url } = require('../utils/config');
const { logger, errorLogger } = require('../utils/logging/logger');

function logErrorToFile(error) {
    errorLogger.error(error.message, { timeStamp: new Date().toISOString(), type: error.name, stack: error.stack });
}


async function connectToDB() {
    try {
        await mongoose.connect(url);
        logger.info(' connected to MongoDB ');
    }
    catch(error) {
        logErrorToFile(error);
    }
}

async function disconnectFromDB() {
    try {
        await mongoose.connection.close();
        logger.info('database connection closed');
    }
    catch(error) {
        logErrorToFile(error);
    }
}

module.exports = { connectToDB, mongoose, disconnectFromDB };