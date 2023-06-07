// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

// FOR USER
const createUserBody = Joi.object({
  id: Joi.number(),
  username: Joi.string().alphanum().max(12).required(),
  email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
  country_origin: Joi.number().required(),
  birth_date: Joi.date().required(),
}).required();

module.exports = {
  createUserBody,
};
