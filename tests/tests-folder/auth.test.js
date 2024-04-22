const { describe, it, beforeEach, after } = require('node:test');
const http = require('../httpModule');
const { clearUsersAndCreateBaseUser } = require('../helpers/auth_test_helper');
const { disconnectFromDB } = require('../../db/mongoConnection');
const { baseUser } = require('../helpers/user_test_helper');
const { verifyToken } = require('../../utils/auth/auth');
const assert = require('node:assert');
const { initialNotes } = require('../helpers/notes_test_helper');

describe('test for checking auth of token', async() => {
    beforeEach(async () => {
        await clearUsersAndCreateBaseUser();
    });
    after(async () => {
        await disconnectFromDB();
    });
    it('login should return token and token should return user', async() => {
        const response = await http.post('/login').send({
            username: baseUser.username,
            password: baseUser.password
        });
        const token = response.body.token;
        const foundUser = await verifyToken(token);
        assert.strictEqual(foundUser.username, baseUser.username);
    });
    it('should not be able to post a note without token', async() => {
        const response = await http.post('/api/notes')
            .send(initialNotes[0])
            .expect(401);
        assert.strictEqual(response.body.error, 'Invalid token');
    });
});