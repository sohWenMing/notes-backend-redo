const app = require('../app');
const http = require('supertest')(app);

module.exports = http;