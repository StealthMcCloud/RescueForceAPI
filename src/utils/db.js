const mongoose = require("mongoose");
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const url = `mongodb://${dbUser}:${dbPassword}@ds241723.mlab.com:41723/rescueforcedb`
// const url = 'mongodb://localhost:27017/RescueForce2';

module.exports.connect = () => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
};
