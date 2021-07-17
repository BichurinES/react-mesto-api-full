const { Joi } = require('celebrate');
const { authPattern } = require('./regex-pattern');

module.exports.headersOpt = () => ({
  data: Joi.object().keys({
    cookie: Joi.string().required().regex(authPattern),
  }).unknown(true),
});

module.exports.cardParamsOpt = () => ({
  data: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports.userParamsOpt = () => ({
  data: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});
