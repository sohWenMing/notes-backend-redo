const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const SECRET = process.env.SECRET;
const PASSWORD = process.env.PASSWORD;
const url = process.env.NODE_ENV !== 'test' ? `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/notes-redo?retryWrites=true&w=majority&appName=Cluster0` : `mongodb+srv://nindgabeet:${PASSWORD}@cluster0.hb7m3ac.mongodb.net/notes-redo-test?retryWrites=true&w=majority&appName=Cluster0`;

module.exports = { PASSWORD, url , SECRET };

