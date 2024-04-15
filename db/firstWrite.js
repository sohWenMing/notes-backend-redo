const { connectToDB, mongoose } = require('./mongoConnection');
const { Note } = require('./notes');
const { logger } = require('../utils/logging/logger');

const firstNote = new Note({
    content: 'I can\'t believe i\'m doing this again'
});

const secondNote = new Note({
    content: 'Well, better believe it'
});

async function firstWrite() {
    await connectToDB();
    logger.info('Connected to MongoDB');
    const returnedFirstNote = await firstNote.save();
    logger.info('firstNote: ', returnedFirstNote);
    const returnedSecondNote = await secondNote.save();
    logger.info('secondNOte: ', returnedSecondNote);
    // await Note.deleteMany();
    mongoose.connection.close().then(() => logger.info('writes all written, connection closed'));

}

firstWrite();