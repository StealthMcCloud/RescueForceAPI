const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    dob: Date,
    shelterId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Shelter",
      required: true
    },
    hostId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Host",
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ["adoptable", "foster-only", "need-foster"],
      default: "foster-only"
    },
    species: {
      type: String,
      required: true,
      enum: ["dog", "cat"]
    },
    sex: {
      type: String,
      required: true,
      enum: ["male", "female"]
    },
    photos: [{ type: String }],
    breed: String,
    specialNeeds: Boolean,
    pregnant: Boolean,
    fixed: Boolean,
    animalFriendly: Boolean,
    peopleFriendly: Boolean,
    specialDiet: Boolean,
    dietNotes: String,
    photos: Array
  },
  { timestamps: true }
);

module.exports.Animal = mongoose.model("Animal", animalSchema);
