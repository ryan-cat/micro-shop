import * as Joi from 'joi';

export const SignUpDtoValidator = Joi.object({
  email: Joi.string().required().trim().email().max(200),
  name: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z\s]*$/)
    .message('Name can only be letters and spaces')
    .max(100),
  password: Joi.string()
    .required()
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,16}$/)
    .message('Password must be between 6 and 16 characters long and contain at least one letter and number')
});

export const AuthenticateDtoValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});
