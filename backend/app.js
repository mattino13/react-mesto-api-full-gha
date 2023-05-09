const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const appRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleServerError, NotImplementedError } = require('./utils/errors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use('/', appRouter);
app.use('*', (req, res, next) => { next(new NotImplementedError('Not implemented')); });

app.use(errorLogger);
app.use(errors());
app.use((error, req, res, next) => {
  handleServerError(error, res);
  next();
});

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
