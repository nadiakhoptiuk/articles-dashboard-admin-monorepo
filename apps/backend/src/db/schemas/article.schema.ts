import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    link: String,
    pubDate: Date,
    author: String,
    categories: [String],
    isoDate: Date,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model("Article", ArticleSchema);
