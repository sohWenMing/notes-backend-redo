const express = require('express');
const app = express();
const { morganLogger } = require('./utils/logging/morgan');
const { errorMiddleware } = require('./utils/logging/logger');
const { connectToDB } = require('./db/mongoConnection');
const { noteRouter } = require('./controllers/notes');

app.use(express.json());

if(process.env.NODE_ENV !== 'test') {
    app.use(morganLogger);
}



app.use('/', noteRouter);



app.get('/', (req, res) => {
    res.status(200).send('Success');
});



connectToDB();

app.use(errorMiddleware);


module.exports = app;


