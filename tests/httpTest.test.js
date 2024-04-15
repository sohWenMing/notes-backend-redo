const { it, after, before, describe } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB } = require('../db/mongoConnection');
const { NoteService } = require('../service/notes');
const app = require('../app');
const httpTest = require('supertest')(app);
const { logger } = require('../utils/logging/logger');

describe('test suite for database connections', async () => {
    before(async() => {
        await NoteService.deleteAll();
        logger.info('DB cleared for database connections test');
    });
    after(async() => {
        await NoteService.deleteAll();
        await disconnectFromDB();
        logger.info('test suite for database connections ran, successfully disconnected from DB');
    });
    it('base route should be successful', async() => {
        await httpTest.get('/')
            .expect(200);
    });
    it('call to api route should return application/json', async() => {
        await httpTest.get('/api')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    it('save one should work', async() => {
        const reqBody = {
            content: 'this is the first note'
        };
        const postResponse = await httpTest.post('/api')
            .send(reqBody)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const searchId = postResponse.body.id;
        const searchedArray = await httpTest.get(`/api/${searchId}`);
        assert.strictEqual(searchedArray.body[0].content, reqBody.content);
    });
});
