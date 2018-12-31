const jwt = require("jsonwebtoken");
const { Host } = require('../resources/host/host.model');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const { HOST, SHELTER } = require('../config');

const newToken = (user, type) => {
    return jwt.sign({id: user._id, type }, JWT_SECRET, {expiresIn: '1h'});
};

const register = async (req, res) => {
  const { name, address, phoneNumber, email } = req.body;
  if (!name || !address || !phoneNumber || !email) {
    return res
      .status(400)
      .send({ message: "name, address, phone number, and email required" });
  }

  try {
      const host = await Host.create(req.body);
      const token = newToken(host._id, HOST);
      return res.status(201).send({ token });
  } catch (err) {
      console.error(err);
      return res.sendStatus(500);
  }
};


module.exports = {
    register
};