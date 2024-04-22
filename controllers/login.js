const express = require('express');
const loginRouter = express.Router();
const baseURL = '/login';
const bcrypt = require('bcrypt');
const { UserService } = require('../service/users');
const { errorCreateAndThrow } = require('../utils/error_utils/errorUtils');
const { signToken } = require('../utils/auth/auth');

loginRouter.post(baseURL, async(req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            errorCreateAndThrow('MandatoryInfoNotEnteredError', 'Mandatory information was not filled in.');
        }
        const foundUser = await UserService.getUserByUserName(username);
        if(!foundUser) {
            errorCreateAndThrow('UserNotFoundError', `user with username ${username} could not be found.`);
        }
        const match = await bcrypt.compare(password, foundUser.passwordHash);
        if(!match) {
            errorCreateAndThrow('WrongPassWordError', 'Username and password do not match');
        }
        const userCookieData = {
            username: foundUser.username,
            name: foundUser.name
        };

        const token = signToken(userCookieData);
        res.cookie('notes-token', token);
        res.status(200).send({ token });
    }
    catch(error) {
        next(error);
    }
});

module.exports = { loginRouter };