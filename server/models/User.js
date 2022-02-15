const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: { type: String, unique: false, required: true },
  lastName: { type: String, unique: false, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  verified: { type: Boolean, unique: false, required: true },
  joinedAt: { type: Date, required: true },
});

module.exports = mongoose.model("User", User);
