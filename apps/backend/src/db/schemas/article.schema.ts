import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    link: String,
    pubDate: Date,
    categories: [String],
    isoDate: Date,
    imageUrl: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model("Article", ArticleSchema);
