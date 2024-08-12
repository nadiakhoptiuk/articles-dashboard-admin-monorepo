import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  token: String,
});

export const User = mongoose.model("User", UserSchema);
