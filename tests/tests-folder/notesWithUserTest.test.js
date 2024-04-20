const http = require('../httpModule');
const { describe, it, after, beforeEach } = require('node:test');
const { disconnectFromDB } = require('../../db/mongoConnection');
const { User, UserService } = require('../../service/users.js');
const { Note, NoteService } = require('../../service/notes.js');
const { baseUser, listOfUsers, saveAndReturnBaseUserJson } = require('../helpers/user_test_helper');
const { initialNotes, createInitialNote } = require('../helpers/notes_test_helper');
const assert = require('node:assert');


async function httpSaveInitialNote(savedUser) {
    const noteToSave = await createInitialNote(savedUser);
    const savedNote = await http.post('/api/notes')
        .send(noteToSave)
        .expect('Content-Type', /application\/json/);
    return({
        noteInput: noteToSave,
        savedNote: savedNote
    });
}

//the scenario should be for testing the integration of creating of notes through the http method
//as such, we should be creating the user using the service, and not the http method

describe('test suite for working with users + notes', async() => {
    let savedUser = {};
    beforeEach(async () => {
        await UserService.deleteAll();
        await NoteService.deleteAll();
        savedUser = await saveAndReturnBaseUserJson();
    });
    after(async () => {
        await disconnectFromDB();
    });

    it('saving one user should work and return Id: ', async() => {
        const { noteInput, savedNote } = await httpSaveInitialNote(savedUser);
        assert.deepEqual(noteInput.userId, savedNote.body.user);
    });

    it('after updating references, populate functio should work', async() => {
        const { savedNote } = await httpSaveInitialNote(savedUser);
        const noteObject = await NoteService.findById(savedNote.body.id);
        const noteIdObject = noteObject._id;
        const userObject = await UserService.findById(noteObject.user.toString());
        userObject.notes = userObject.notes.concat(noteIdObject);
        await UserService.saveUser(userObject);
        const savedUserObject = await UserService.findById(noteObject.user.toString());
        assert.strictEqual(savedUserObject._id.toString(), noteObject.user.toString());
    });
});



