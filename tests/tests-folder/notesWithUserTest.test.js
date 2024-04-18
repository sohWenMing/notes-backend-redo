const http = require('../httpModule');
const { describe, it, after, beforeEach } = require('node:test');
const { disconnectFromDB } = require('../../db/mongoConnection');
const { User, UserService } = require('../../service/users.js');
const { Note, NoteService } = require('../../service/notes.js');
const { baseUser, listOfUsers, saveAndReturnBaseUserJson, getUserIdString } = require('../helpers/user_test_helper');
const { initialNotes } = require('../helpers/notes_test_helper');
const assert = require('node:assert');

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
        // const savedUser = await saveAndReturnBaseUserJson();
        const userId = savedUser.id;
        const userIdString = await getUserIdString(userId);
        const noteToSave = {
            ...initialNotes[0],
            userId: userIdString
        };
        const savedNote = await http.post('/api/notes')
            .send(noteToSave)
            .expect('Content-Type', /application\/json/);
        assert.deepEqual(noteToSave.userId, savedNote.body.user);
        // console.log("savedNote", savedNote);
        const noteFromDB = await NoteService.findById(savedNote.body.id);
        const noteIdToAdd = noteFromDB._id;
        const userToUpdate = await UserService.findById(userId);
        userToUpdate.notes = userToUpdate.notes.concat(noteIdToAdd);
        const user = await UserService.saveUser(userToUpdate);
        console.log("user after save: ", user);
    });
    // it('saving multiple notes to one user should result in proper storage: ', async() => {
    //     // const savedUser = await saveAndReturnBaseUserJson();
    //     const userId = savedUser.id;
    //     const foundUser = await UserService.findById(userId);
    //     console.log(foundUser);
    //     // const foundUserJson = foundUser.toJSON();
    //     const promiseArray = initialNotes.map(async(note) => {
    //         const noteToSave = new Note({
    //             ...note,
    //             user: foundUser._id
    //         });
    //         await NoteService.save(noteToSave);
    //     });
    //     await Promise.all(promiseArray);
    //     const allNotes = await NoteService.getAll();
    //     const user = await UserService.findById(userId);
    //     console.log(user.toJSON());
    // });
});


