const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = require('../constants/jwt-secret');

const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const UserExistsError = require('../errors/user-exists-error');
const NotValidCredentials = require('../errors/not-valid-credentials-err');
const DefaultError = require('../errors/default-err');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send({ users: data }))
    .catch((err) => next(new DefaultError(err.message)));
};

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Передан невалидный ID пользователя');
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Передан невалидный ID пользователя');
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => {
          res.send({
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new UserExistsError('Пользователь с таким email уже существует');
          } else if (err.name === 'ValidationError') {
            throw new ValidationError(err.message);
          } else {
            throw new DefaultError(err.message);
          }
        })
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotValidCredentials('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotValidCredentials('Неправильные почта или пароль');
          }

          const token = jwt.sign({ _id: user._id }, JWT_SECRET);

          res.cookie('jwt', token, {
            maxAge: 360000 * 24 * 7,
            httpOnly: true,
          }).end();
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(err.message);
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Передан невалидный ID пользователя');
      } else if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методе обновления профиля пользователя');
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Передан невалидный ID пользователя');
      } else if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные в методе обновления профиля пользователя');
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};
