const express = require('express');
const noteRouter = express.Router();
const NoteService = require('../service/notes').NoteService;

const baseURL = '/api';

noteRouter.get(baseURL, async (req, res, next) => {
    try {
        const allNotes = await NoteService.getAll();
        res.status(200).json(allNotes);
    }
    catch(error) {
        next(error);
    }
});

module.exports = {
    noteRouter
};