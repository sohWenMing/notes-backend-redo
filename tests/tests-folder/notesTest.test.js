const { it, after, before, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB } = require('../db/mongoConnection');
const app = require('../app');
const httpTest = require('supertest')(app);
const { logger } = require('../utils/logging/logger');
const { clearDB, initialNotes } = require('./notes_test_helper');

describe('test suite for database connections', async () => {

    before(async() => {
        await clearDB();
        logger.info('DB cleared for database connections test');
    });

    after(async() => {
        await clearDB();
        await disconnectFromDB();
        logger.info('test suite for database connections ran, successfully disconnected from DB');
    });

    beforeEach(async() => {
        await clearDB();
    });

    it('base route should be successful', async() => {
        await httpTest.get('/api/notes')
            .expect(200);
    });
    it('call to api route should return application/json', async() => {
        await httpTest.get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    it('save one should work', async() => {
        const postResponse = await httpTest.post('/api/notes')
            .send(initialNotes[0])
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const searchId = postResponse.body.id;
        const searchedArray = await httpTest.get(`/api/notes/${searchId}`);
        assert.strictEqual(searchedArray.body[0].content, initialNotes[0].content);
    });
    it('a note without content should not save', async() => {
        const reqBody = {
            important: true
        };
        await httpTest.post('/api/notes')
            .send(reqBody)
            .expect(400);
        const allNotes = await httpTest.get('/api/notes');
        assert.strictEqual(allNotes.body.length, 0);
    });
    it('multiple correct notes should save', async() => {
        initialNotes.forEach(async (note) => {
            await httpTest.post('/api/notes')
                .send(note);
        });
        const allNotes = await httpTest.get('/api/notes');
        assert.strictEqual(allNotes.body.length, 2);
    });
});
