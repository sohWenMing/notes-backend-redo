const app = require('../app');
const { UserService } = require('../service/users');
const { describe, it, before, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB } = require('../db/mongoConnection');
const http = require('supertest')(app);
const { baseUser, listOfUsers } = require('./user_test_helper');
const { json } = require('express');

describe('suite of tests for users http calls', async() => {
    before(async () => {
        await UserService.deleteAll();
    });
    after(async () => {
        await UserService.deleteAll();
        await disconnectFromDB();
    });
    beforeEach(async () => {
        await UserService.deleteAll();
        await http.post('/api/users').send(baseUser);
    });

    it('should work with fresh username', async() => {
        const savedUser = await http.post('/api/users')
            .send(listOfUsers[0])
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const foundUser = await UserService.findById(savedUser.body.id);
        assert.strictEqual(listOfUsers[0].username, foundUser.username);
        assert.strictEqual(listOfUsers[0].name, foundUser.name);
    });
    it('duplicate username should not work', async() => {
        const allUsers = await UserService.getAll();
        await http.post('/api/users').send(baseUser).expect(400).expect(json);
        const allUsersAfterSave = await UserService.getAll();
        assert.strictEqual(allUsers.length, allUsersAfterSave.length);
    });
});