import Joi from "joi";

export const articleCreateSchemaValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "any.required": "Title is required",
  }),

  link: Joi.string().trim().required().messages({
    "any.required": "Link is required",
  }),

  pubDate: Joi.date().required().messages({
    "any.required": "PubDate is required",
  }),

  author: Joi.string().trim().required().messages({
    "any.required": "Author is required",
  }),

  categories: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Categories are required",
  }),

  isoDate: Joi.date().required().messages({
    "any.required": "IsoDate are required",
  }),
});

export const articleUpdateSchemaValidation = Joi.object({
  title: Joi.string().trim(),

  link: Joi.string().trim(),

  pubDate: Joi.date(),

  author: Joi.string().trim(),

  categories: Joi.array().items(Joi.string()),

  isoDate: Joi.date(),
})
  .min(1)
  .messages({
    "any.required": "At least one field for update is required",
  });
