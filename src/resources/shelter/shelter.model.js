const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
    photos: Array
  },
  { typestamps: true }
);

shelterSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
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

shelterSchema.methods.checkPassword = function(password) {
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

module.exports.Shelter = mongoose.model("Shelter", shelterSchema);
