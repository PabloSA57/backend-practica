const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(1);
const description = Joi.string();
const price = Joi.number();
const quantity = Joi.number();

const productSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  quantity: quantity.required(),
});

const productsSchema = Joi.array().items(productSchema);

module.exports = { productSchema, productsSchema };
