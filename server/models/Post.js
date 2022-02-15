const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  postId: { type: String, unique: true, required: true },
  firstName: { type: String, unique: false, required: true },
  lastName: { type: String, unique: false, required: true },
  username: { type: String, unique: false, required: true },
  feelingStatus: { type: String, unique: false, required: true },
  suicidalThoughts: { type: Boolean, unique: false, required: true },
  gratefulFor: {
    type: String,
    unique: false,
    required: true,
    min: 100,
    max: 500,
  },
  private: { type: Boolean, unique: false, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Post", Post);
