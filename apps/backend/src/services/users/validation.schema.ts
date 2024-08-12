import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    "any.required": "Email is required",
  }),

  password: Joi.string().trim().required().messages({
    "any.required": "Email is required",
  }),
});
