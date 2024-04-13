const express = require('express');
const app = express();
const { morganLogger } = require('./utils/logging/morgan');
const { errorMiddleware } = require('./utils/logging/logger');
const { connectToDB } = require('./db/mongoConnection');
const { noteRouter } = require('./controllers/notes');

app.use(express.json());
app.use(morganLogger);

app.use('/', noteRouter);


connectToDB();

app.use(errorMiddleware);


module.exports = app;


