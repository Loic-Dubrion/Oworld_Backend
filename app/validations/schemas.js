// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

// For body data
const createUserBody = Joi.object({
  id: Joi.number(),
  username: Joi.string().max(20).required(),
  email: Joi.string().pattern(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/).required(),
  country_origin: Joi.number().required(),
  birth_date: Joi.date().max('now').required(),
}).required();

const updateUserBody = Joi.object({
  id: Joi.number(),
  old_password: Joi.string(),
  username: Joi.string().max(20),
  email: Joi.string().pattern(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),
}).or('username', 'email', 'password', 'old_password').required();

const deleteUserBody = Joi.object({
  id: Joi.number(),
  password: Joi.string(),
}).required();

// For params data
const validateIdParam = Joi.string().pattern(/^[0-9]+$/);
const validateIsoParam = Joi.string().pattern(/^[a-zA-Z]{2,3}$/).required();

module.exports = {
  createUserBody,
  updateUserBody,
  deleteUserBody,
  validateIdParam,
  validateIsoParam,
};
