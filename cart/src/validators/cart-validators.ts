import * as Joi from 'joi';

export const AddItemToCartDtoValidator = Joi.object({
  productId: Joi.string().required()
});
