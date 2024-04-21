const express = require('express');
const app = express();
const { morganLogger } = require('./utils/logging/morgan');
const { errorMiddleware } = require('./utils/error_middleware/errorMiddleware');
const { connectToDB } = require('./db/mongoConnection');
const { noteRouter } = require('./controllers/notes');
const { usersRouter } = require('./controllers/users');
const { loginRouter } = require('./controllers/login');

app.use(express.json());

if(process.env.NODE_ENV !== 'test') {
    app.use(morganLogger);
}

app.use('/', loginRouter);

app.use('/', noteRouter);
app.use('/', usersRouter);


app.get('/', (req, res) => {
    res.status(200).send('Success');
});

app.all('*', (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
});

connectToDB();


app.use(errorMiddleware);




module.exports = app;


