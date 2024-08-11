import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  id: String,
  title: String,
  link: String,
  pubDate: Date,
  author: String,
  categories: [String],
  isoDate: Date,
});

export const Article = mongoose.model("Article", ArticleSchema);
