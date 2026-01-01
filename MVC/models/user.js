const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String, // Datatype
      required: true, // Must be filled
      unique: true, // It means it should be unique
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }  //show when the user is created and updated
);

const User = mongoose.model("user", userSchema);

module.exports = User;