const Card = require('../models/card');
const NotAccessError = require('../errors/not-access-err');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const DefaultError = require('../errors/default-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.json(cards))
    .catch((err) => next(new DefaultError(err.message)));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((createdCard) => res.send(createdCard))
        .catch(() => new NotFoundError('Созданная карточка не была найдена в базе'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError(err.message);
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .populate('owner')
    .then((card) => {
      if (req.user._id !== card.owner._id.toString()) {
        throw new NotAccessError('У вас нет прав на удаление карточки');
      }
      Card.findByIdAndRemove(card._id)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
    })
    .catch((err) => {
      if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Передан невалидный ID карточки');
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Передан невалидный ID карточки');
      } else if (err.statusCode) {
        throw err;
      } else {
        throw new DefaultError(err.message);
      }
    })
    .catch(next);
};
