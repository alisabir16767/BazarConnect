const Joi = require('joi');
const { ExpressError } = require('./errorMiddleware');

// Generic validation middleware function
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(new ExpressError(400, error.details[0].message));
    }
    req.validatedBody = value; // Attach validated data to the request object
    next();
  };
};

module.exports = validateSchema;
