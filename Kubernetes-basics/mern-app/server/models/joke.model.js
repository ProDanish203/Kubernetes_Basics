import mongoose, { Schema } from "mongoose";

const JokeSchema = new Schema({
  joke: String,
});

export const Joke = mongoose.models.Joke || mongoose.model("Joke", JokeSchema);
