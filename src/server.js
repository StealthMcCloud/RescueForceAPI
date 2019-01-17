const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connect } = require("./utils/db");
const animalRouter = require("./resources/animal/animal.router");
const hostRouter = require("./resources/host/host.router");
const shelterRouter = require("./resources/shelter/shelter.router");
const {
  register,
  signin,
  classify,
  hostAndShelterOnly,
  validateToken
} = require("./utils/auth");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.post("/register", register);
app.post("/validate", validateToken);
app.post("/signin", signin);
app.use("/api", classify);
app.use("/api/hosts", hostAndShelterOnly, hostRouter);
app.use("/api/animals", animalRouter);
app.use("/api/shelters", shelterRouter);

module.exports.start = async () => {
  try {
    await connect();
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};
