const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../constants/regex-pattern');
const { headersOpt, userParamsOpt } = require('../constants/celebrateTemplates');
const {
  getAllUsers,
  getMyInfo,
  findUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: headersOpt().data,
}), getAllUsers);
router.get('/me', celebrate({
  headers: headersOpt().data,
}), getMyInfo);
router.get('/:id', celebrate({
  params: userParamsOpt().data,
  headers: headersOpt().data,
}), findUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: headersOpt().data,
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlPattern),
  }),
  headers: headersOpt().data,
}), updateAvatar);

module.exports = router;
