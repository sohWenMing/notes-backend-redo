const app = require('../app');
const http = require('supertest')(app);
const { describe, it, after, beforeEach } = require('node:test');
const { disconnectFromDB } = require('../db/mongoConnection');
const { User, UserService } = require('../service/users');
const {Note, NoteService } = require('../service/notes');
const { baseUser, listOfUsers } = require('./user_test_helper');
const { initialNotes } = require('./notes_test_helper');
const assert = require('node:assert');
const { json } = require('express');

describe('test suite for working with users + notes', async() => {
    beforeEach(async () => {
        await UserService.deleteAll();
        await NoteService.deleteAll();
    });
    after(async () => {
        await disconnectFromDB();
    });
    it('saving one user should work and return Id: ', async() => {
        const savedUser = await http.post('/api/users')
            .send(baseUser)
            .expect('Content-Type', /application\/json/);
        const userId = savedUser.body.id;
        const foundUser = await UserService.findById(userId)
        const foundUserJson = foundUser.toJSON();
        const idToPass = foundUser._id;
        const noteToSave = {
            ...initialNotes[0],
            userId: foundUserJson.id.toString()
        };
        console.log("note to save: ", noteToSave);
        const savedNote = await http.post('/api/notes')
            .send(noteToSave)
            .expect('Content-Type', /application\/json/);
        console.log("saved note: ", savedNote.body);

    });
});


