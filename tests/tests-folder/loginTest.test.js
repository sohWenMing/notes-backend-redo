const http = require('../httpModule');
const { it, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const { disconnectFromDB } = require('../../db/mongoConnection');
const { clearUsersAndCreateBaseUser } = require('../helpers/auth_test_helper');
const { baseUser } = require('../helpers/user_test_helper');

describe('suite of tests to test login functionality', async() => {
    beforeEach(async() => {
        await clearUsersAndCreateBaseUser();
        //save the user to database
    });

    after(async() => {
        await disconnectFromDB();
    });

    it('if passwords match, response should be 200', async() => {
        const response = await http.post('/login')
            .send({
                username: baseUser.username,
                password: baseUser.password
            })
            .expect(200);
        const resBody = response.body;
        const token = resBody.token;
        assert.notEqual(token, null || undefined || '');
    });
    it('if username not filled in, response should be 400', async() => {
        const response = await http.post('/login')
            .send({
                username: '',
                password: baseUser.password
            })
            .expect(400);
        assert.strictEqual(response.body.error, 'Mandatory information was not filled in.');
    });
    it('if password not filled in, response should be 400', async() => {
        const { body } = await http.post('/login')
            .send({
                username: baseUser.username,
                password: ''
            })
            .expect(400);
        assert.strictEqual(body.error, 'Mandatory information was not filled in.');
    });
    it('if user cannot be found, response should be 404', async() => {
        const { body } = await http.post('/login')
            .send({
                username: 'wrong user',
                password: baseUser.password
            })
            .expect(404);
        assert.strictEqual(body.error, `user with username wrong user could not be found.`);
    });
    it('if password does not match, response should be 403', async() => {
        const { body } = await http.post('/login')
            .send({
                username: baseUser.username,
                password: 'wrong_password'
            })
            .expect(403);
        assert.strictEqual(body.error, 'Username and password do not match');
    });
});