const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const productSchema = Joi.object({
  shop_id: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({ "string.pattern.base": "Invalid shop_id format" }),

  review: Joi.array().items(Joi.string().pattern(objectIdPattern)).optional(),

  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),

  images: Joi.array().items(Joi.string().uri().required()).required(),

  created_at: Joi.date().default(() => new Date(), "current date"),
  updated_at: Joi.date().default(() => new Date(), "current date"),
}).required();

module.exports = { productSchema };
