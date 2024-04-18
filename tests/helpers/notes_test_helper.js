const{ NoteService } = require('../../service/notes');
const { logger } = require('../../utils/logging/logger');

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

async function clearDB() {
    await NoteService.deleteAll();
    logger.info('DB cleared');
}

module.exports = {
    clearDB, initialNotes
};

