const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10
    },
    capacity: {
      cats: Number,
      dogs: Number
    }
  },
  { typestamps: true }
);

module.exports.Shelter = mongoose.model("Shelter", shelterSchema);
