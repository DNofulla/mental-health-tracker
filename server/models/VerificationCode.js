const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerificationCode = new Schema({
  username: { type: String, unique: false, required: true },
  verificationCode: { type: String, unique: true, required: true },
  destinationNumber: { type: String, unique: false, required: true },
  expires: { type: Date, required: true },
});

module.exports = mongoose.model("VerificationCode", VerificationCode);
