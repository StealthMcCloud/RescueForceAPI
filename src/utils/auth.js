const jwt = require("jsonwebtoken");
const { Host } = require("../resources/host/host.model");
const { Shelter } = require("../resources/shelter/shelter.model");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const { HOST, SHELTER } = require("../config").types;

const newToken = (id, type) => {
  return jwt.sign({ id, type }, JWT_SECRET, { expiresIn: "1h" });
};

const register = async (req, res) => {
  const { name, address, phoneNumber, email, password } = req.body;
  if (!name || !address || !phoneNumber || !email || !password) {
    return res.status(400).send({
      message: "name, address, phone number, email, and password required"
    });
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

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).send({ message: "email and password required" });
  }
  const invalid = { message: "invalid email and password combination" };
  try {
    const hostSigninAttempt = await signinHost(email, password);
    console.log(hostSigninAttempt);
    if (hostSigninAttempt) {
      if (hostSigninAttempt.err) {
        return res.sendStatus(500);
      }
      if (!hostSigninAttempt.id) {
        return res.status(401).send(invalid);
      }
      if (hostSigninAttempt.id) {
        const token = newToken(hostSigninAttempt.id, HOST);
        return res.status(201).send({ token });
      }
    } else {
      const shelterSigninAttempt = await signinShelter(email, password);
      console.log(shelterSigninAttempt);
      if (shelterSigninAttempt) {
        if (shelterSigninAttempt.err) {
          return res.sendStatus(500);
        }
        if (!shelterSigninAttempt.id) {
          return res.status(401).send(invalid);
        }
        if (shelterSigninAttempt.id) {
          const token = newToken(shelterSigninAttempt.id, SHELTER);
          return res.status(201).send({ token });
        }
      } else {
        return res.status(401).send(invalid);
      }
    }
  } catch (err) {}
};

const signinHost = async (email, password) => {
  try {
    const host = await Host.findOne({ email })
      .select("email password")
      .exec();
    if (!host) {
      return null;
    }
    const match = await host.checkPassword(password);
    if (!match) {
      return { err: null, id: null };
    }
    return { err: null, id: host._id };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const signinShelter = async (email, password) => {
  try {
    const shelter = await Shelter.findOne({ email })
      .select("email password")
      .exec();
    if (!shelter) {
      return null;
    }
    const match = await shelter.checkPassword(password);
    if (!match) {
      return { err: null, id: null };
    }
    return { err: null, id: shelter._id };
  } catch (err) {
    console.error(err);
    return { err };
  }
};



module.exports = {
  register,
  signin
};
