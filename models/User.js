const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

// User collection schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);