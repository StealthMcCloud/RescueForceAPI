const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      ref: "shelter"
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
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
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
    },
    photos: [{ type: String }]
  },
  { typestamps: true }
);

hostSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

hostSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

module.exports.Host = mongoose.model("Host", hostSchema);
