const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 86400, // Set the expiration time to 0 seconds
   },
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);