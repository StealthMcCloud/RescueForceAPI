const mongoose = require("mongoose");

module.exports.connect = (url = "mongodb://localhost:27017/RescueForce") => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
};
