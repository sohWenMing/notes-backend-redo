const express = require('express');
const noteRouter = express.Router();
const { NoteService, Note } = require('../service/notes');
const { UserService } = require('../service/users');
const { logger } = require('../utils/logging/logger');

const baseURL = '/api/notes';

noteRouter.get(baseURL, async (req, res, next) => {
    try {
        const allNotes = await NoteService.getAll();
        res.status(200).json(allNotes);
    }
    catch(error) {
        next(error);
    }
});

noteRouter.post(baseURL, async (req, res, next) => {
    try {
        // console.log("req body: ", req.body);
        const body = req.body;
        const content = body.content;
        const important = body.important ? body.important : undefined;
        const userId = body.userId;

        const user = await UserService.findById(userId);
        if(!user) {
            const noUserError = new Error;
            noUserError.name = 'User not found';
            noUserError.message = `User with id ${userId} could not be found in database`;
            throw noUserError;
        }
        const foundUserId = user._id;

        const noteToSave = new Note({
            content: content,
            important: important,
            user: foundUserId
        });

        const savedNote = await NoteService.save(noteToSave);
        // logger.info('saved note in router: ',savedNote);
        res.status(201).json(savedNote);
    }
    catch(error) {
        next(error);
    }
});

noteRouter.get(`${baseURL}/:id`, async (req, res, next) => {
    try {
        const id = req.params.id;
        const foundRecord = await NoteService.search('_id', id);
        res.status(200).json(foundRecord);
    }
    catch(error) {
        next(error);
    }

});

module.exports = {
    noteRouter
};