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
    },
    photos: Array
  },
  { typestamps: true }
);

module.exports.Shelter = mongoose.model("shelter", shelterSchema);
