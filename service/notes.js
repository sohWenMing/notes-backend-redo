const { Note } = require('../db/notes');

class NoteService {
    async getAll() {
        const allNotes = await Note.find();
        return allNotes;
    }
    async deleteAll() {
        await Note.deleteMany();
    }
    async save(Note) {
        const savedNote = await Note.save();
        return savedNote;
    }
    async search(key, value) {
        const searchObject = {};
        searchObject[key] = value;
        const foundArray = await Note.find(searchObject);
        return foundArray;
    }
}

module.exports = {
    NoteService: new NoteService
};