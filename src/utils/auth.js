const jwt = require("jsonwebtoken");
const { Host } = require("../resources/host/host.model");
const { Shelter } = require("../resources/shelter/shelter.model");
const JWT_SECRET = process.env.JWT_SECRET;
const { DEFAULT, HOST, SHELTER } = require("../config").types;

const newToken = (id, type) => {
  return jwt.sign({ id, type }, JWT_SECRET, { expiresIn: "4h" });
};

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

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
    const host = await signinHost(email, password);
    if (host) {
      if (host.err) {
        return res.sendStatus(500);
      }
      if (!host.id) {
        return res.status(401).send(invalid);
      }
      if (host.id) {
        const token = newToken(host.id, HOST);
        return res.status(201).send({ token, data: host.data, type: HOST });
      }
    } else {
      const shelter = await signinShelter(email, password);
      if (shelter) {
        if (shelter.err) {
          return res.sendStatus(500);
        }
        if (!shelter.id) {
          return res.status(401).send(invalid);
        }
        if (shelter.id) {
          const token = newToken(shelter.id, SHELTER);
          return res
            .status(201)
            .send({ token, data: shelter.data, type: SHELTER });
        }
      } else {
        return res.status(401).send(invalid);
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const signinHost = async (email, hostPassword) => {
  try {
    const host = await Host.findOne({ email }).exec();
    if (!host) {
      return null;
    }
    const match = await host.checkPassword(hostPassword);
    if (!match) {
      return { err: null, id: null };
    }
    const { password, ...data} = JSON.parse(JSON.stringify(host));
    return { err: null, id: host._id, data};
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const signinShelter = async (email, shelterPassword) => {
  try {
    const shelter = await Shelter.findOne({ email }).exec();
    if (!shelter) {
      return null;
    }
    const match = await shelter.checkPassword(shelterPassword);
    if (!match) {
      return { err: null, id: null };
    }
    const { password, ...data} = JSON.parse(JSON.stringify(shelter));
    return { err: null, id: shelter._id, data: data };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const classify = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    req.userType = DEFAULT;
    return next();
  }
  const token = bearer.split(" ")[1].trim();
  try {
    const payload = await verifyToken(token);
    if (payload.type === HOST) {
      const host = await Host.findById(payload.id)
        .select("-password")
        .lean()
        .exec();
      if (!host) {
        req.userType = DEFAULT;
        return next();
      }
      req.user = host;
      req.userType = HOST;
      next();
    } else if (payload.type === SHELTER) {
      const shelter = await Shelter.findById(payload.id)
        .select("-password")
        .lean()
        .exec();
      if (!shelter) {
        req.userType = DEFAULT;
        return next();
      }
      req.user = shelter;
      req.userType = SHELTER;
      next();
    }
  } catch (err) {
    res.sendStatus(401);
  }
};

const hostAndShelterOnly = (req, res, next) => {
  if (!(req.userType === HOST || req.userType === SHELTER)) {
    return res.sendStatus(401);
  }
  next();
};

const shelterOnly = (req, res, next) => {
  if (!req.userType === SHELTER) {
    return res.sendStatus(401);
  }
  next();
};

module.exports = {
  register,
  signin,
  classify,
  hostAndShelterOnly,
  shelterOnly
};
