const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    shelterId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "shelter",
    },
    approved: {
      type: Boolean,
      required: true,
      default: false
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
    healthEmergency: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { typestamps: true }
);

module.exports.Host = mongoose.model("Host", hostSchema);
