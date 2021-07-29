const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../constants/regex-pattern');
const { headersOpt, cardParamsOpt } = require('../constants/celebrateTemplates');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: headersOpt().data,
}), getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlPattern),
  }),
  headers: headersOpt().data,
}), createCard);
router.delete('/:cardId', celebrate({
  params: cardParamsOpt().data,
  headers: headersOpt().data,
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  params: cardParamsOpt().data,
  headers: headersOpt().data,
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: cardParamsOpt().data,
  headers: headersOpt().data,
}), deleteLike);

module.exports = router;
