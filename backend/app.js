const { PORT = 3000 } = process.env;

// Спасибо за проверку проекта, полезные замечания и интересные дополнительные материалы!
// Начну подготовку к собеседованиям! :)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { corsHandler } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const { urlPattern } = require('./constants/regex-pattern');
const auth = require('./middlewares/auth');

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Слишком много запросов, попробуйте повторить позже' },
});
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Слишком много запросов, попробуйте повторить позже' },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(corsHandler);
app.use(requestLogger);
app.use(apiLimiter);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', signupLimiter, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlPattern),
  }),
}), createUser);
app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));
app.use('*', require('./routes/others'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
