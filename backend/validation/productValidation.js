const Joi = require("joi");
const productSchema = Joi.object({
  shop_id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string().required()).required(),
  created_at: Joi.date().default(() => new Date()),
  updated_at: Joi.date().default(() => new Date()),
}).required();

module.exports = { productSchema };
