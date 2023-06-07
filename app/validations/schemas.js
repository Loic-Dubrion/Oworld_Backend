// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

// FOR USER
const createUserBody = Joi.object({
  id: Joi.number(),
  username: Joi.string().alphanum().max(20).required(),
  email: Joi.string().pattern(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
  country_origin: Joi.number().required(),
  birth_date: Joi.date().required(),
}).required();

module.exports = {
  createUserBody,
};
