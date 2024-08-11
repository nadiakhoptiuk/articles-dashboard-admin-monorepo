import Joi from "joi";

export const createArticleSchema = Joi.object({
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
