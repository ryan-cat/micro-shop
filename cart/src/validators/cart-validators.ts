import * as Joi from 'joi';

export const AddItemToCartDtoValidator = Joi.object({
  name: Joi.string().required()
});
