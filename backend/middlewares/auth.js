const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../constants/jwt-secret');
const NotAccessError = require('../errors/not-access-err');
const NotValidCredentials = require('../errors/not-valid-credentials-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new NotAccessError('Необходима авторизация'));
  }

  let payload = '';

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NotValidCredentials('Переданный токен некорректен'));
  }

  req.user = payload;

  next();
};
