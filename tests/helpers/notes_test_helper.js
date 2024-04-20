const{ NoteService } = require('../../service/notes');
const { logger } = require('../../utils/logging/logger');
const { getUserIdString } = require('./user_test_helper');
const http = require('../httpModule');

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only Javascript',
        important: true
    }
];

async function createInitialNote(savedUser) {
    const userId = savedUser.id;
    const userIdString = await getUserIdString(userId);
    const noteToSave = {
        ...initialNotes[0],
        userId: userIdString
    };
    return noteToSave;
}

async function clearDB() {
    await NoteService.deleteAll();
    logger.info('DB cleared');
}

module.exports = {
    clearDB, initialNotes, createInitialNote
};

