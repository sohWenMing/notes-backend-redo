const express = require('express');
const usersRouter = express.Router();
const { UserService, User } = require('../service/users');
const bcrypt = require('bcrypt');

const baseUrl = '/api/users';


usersRouter.get(baseUrl, async(req, res, next) => {
    try {
        const allUsers = await UserService.getAll();
        res.status(200).json(allUsers);

    }
    catch(error) {
        next(error);
    }
});

usersRouter.post(baseUrl, async(req, res, next) => {
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
        res.status(201).json(savedUser);
    }
    catch(error) {
        next(error);
    }
});

module.exports = {
    usersRouter
};

