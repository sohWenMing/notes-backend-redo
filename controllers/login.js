const express = require('express');
const loginRouter = express.Router();
const baseURL = '/login';
const jsonwWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { logger } = require('../utils/logging/logger');
const { UserService } = require('../service/users');
const { errorCreateAndThrow } = require('../utils/error_utils/errorUtils');

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
        res.status(200).json(foundUser.toJSON());
    }
    catch(error) {
        next(error);
    }
});

module.exports = { loginRouter };