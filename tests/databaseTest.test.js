const { describe, it, before, after } = require('node:test');
const  assert  = require('node:assert');
const { connectToDB, disconnectFromDB } = require('../db/mongoConnection');
const { NoteService }  = require('../service/notes');
const { Note } = require('../db/notes');
// const { logger } = require('../utils/logging/logger');

const contentText = 'This is the first note';
const firstNote = new Note({
    content: contentText
});

describe('database tests', async() => {
    before(() => {
        connectToDB();
    });
    after(() => {
        disconnectFromDB();
    });
    it('clearing database should get no records returned', async() => {
        await NoteService.deleteAll();
        const retrievedNotes = await NoteService.getAll();
        assert.strictEqual(retrievedNotes.length, 0);
    });
    it('adding one new record, search filter should pass', async() => {
        await firstNote.save();
        const savedNoteArray = await NoteService.search('content', contentText);
        const savedNote = savedNoteArray[0];
        assert.strictEqual(savedNote.content, contentText);
    });
    it('there should now be one record', async() => {
        const retrievedNotes = await NoteService.getAll();
        assert.strictEqual(retrievedNotes.length, 1);
    });
    it('duplicate records should not be allowed', async() => {
        try {
            await firstNote.save();
        }
        catch(error) {
            const retrievedNotes = await NoteService.getAll();
            assert.strictEqual(retrievedNotes.length, 1);
        }
    });
    it('null content should not be allowed', async() => {
        try {
            const emptyNote = new Note({
                content: ''
            });
            await emptyNote.save();
        }
        catch(error) {
            const retrievedNotes = await NoteService.getAll();
            assert.strictEqual(retrievedNotes.length, 1);

        }
    });
});