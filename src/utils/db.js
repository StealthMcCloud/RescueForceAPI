const mongoose = require("mongoose");
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const url = `mongodb://${dbUser}:${dbPassword}@ds241723.mlab.com:41723/rescueforcedb`


module.exports.connect = () => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
};
