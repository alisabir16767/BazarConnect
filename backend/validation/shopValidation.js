const Joi = require('joi');

const shopSchema = Joi.object({
  owner_id: Joi.string().required(),
  products: Joi.array().items(Joi.string().optional()),
  name: Joi.string().required(),
  description: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.array().items(Joi.string().required()).required(),
  zip_code: Joi.string().required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string().required()).required(),
  created_at: Joi.date().default(Date.now),
  updated_at: Joi.date().default(Date.now)
}).required();

module.exports = { shopSchema };
