import { states } from './../utils/billing';
import * as Joi from 'joi';

export const CheckoutValidator = Joi.object({
  productIds: Joi.array().required().min(1).message('At least one product must be provided to check out').items(Joi.string().label('product id')),
  billingState: Joi.string()
    .required()
    .valid(...states.map((x) => x.code))
});
