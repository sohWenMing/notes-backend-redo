const express = require('express');
const noteRouter = express.Router();
const { NoteService, Note } = require('../service/notes');
const { logger } = require('../utils/logging/logger');

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

noteRouter.post(baseURL, async (req, res, next) => {
    try {
        const content = req.body.content;
        const noteToSave = new Note({
            content: content
        });
        const savedNote = await NoteService.save(noteToSave);
        logger.info(savedNote);
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