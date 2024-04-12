const Joi = require("joi");

const id = Joi.number().integer();
const email = Joi.string().email();
const name = Joi.string().min(1).max(20);
const lastname = Joi.string().min(1).max(20);
const direction = Joi.string();
const phone = Joi.string();

const customerSchema = Joi.object({
  name: name.required(),
  lastName: lastname.required(),
  email: email.required(),
  direction,
  phone,
});

module.exports = customerSchema;
