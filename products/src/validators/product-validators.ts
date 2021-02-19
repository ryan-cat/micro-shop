import * as Joi from 'joi';

export const CreateProductDtoValidator = Joi.object({
  name: Joi.string().required().trim().min(2).max(70),
  description: Joi.string().required().max(500),
  price: Joi.number().required().precision(2).greater(0),
  imageUrl: Joi.string().uri().required().label('Image url')
});
