const Joi=require('joi');

const orderSchema=Joi.object({
   user_id:Joi.string().required(),
   shop_id:Joi.string().required(),
   

}).required();

module.exports={orderSchema};


