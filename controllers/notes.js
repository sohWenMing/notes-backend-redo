const express = require('express');
const noteRouter = express.Router();
const { NoteService, Note } = require('../service/notes');
const { verifyToken } = require('../utils/auth/auth');

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
        const token = req.cookies['notes-token'] || '12345';

        const foundUser = verifyToken(token, next);
        const body = req.body;
        const content = body.content;
        const important = body.important ? body.important : undefined;
        const userId = foundUser._id;

        const noteToSave = new Note({
            content: content,
            important: important,
            user: userId
        });

        const savedNote = await NoteService.save(noteToSave);
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