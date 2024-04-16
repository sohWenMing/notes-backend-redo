const express = require('express');
const usersRouter = express.Router();
const { UserService, User } = require('../service/users');
const bcrypt = require('bcrypt');




usersRouter.get('/', async(req, res, next) => {
    try {
        res.status(200).send('getting something from /api/users');
    }
    catch(error) {
        next(error);
    }
});

usersRouter.post('/', async(req, res, next) => {
    try {
        const { username, name, password } = req.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User (
            {
                username: username,
                name: name,
                passwordHash: passwordHash
            });
        const savedUser = await UserService.saveUser(newUser);
        res.status(200).json(savedUser);
        next();
    }
    catch(error) {
        next(error);
    }
});

module.exports = {
    usersRouter
};

