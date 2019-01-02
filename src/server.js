const express = require("express");
const morgan = require("morgan");
const { connect } = require("./utils/db");
const animalRouter = require("./resources/animal/animal.router");
const hostRouter = require("./resources/host/host.router");
const shelterRouter = require("./resources/shelter/shelter.router");
const imageRouter = require('./resources/images/image.router');
const { register, signin, protect } = require("./utils/auth");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/register", register);
app.post("/signin", signin);
// app.use("/api", protect);
app.use("/api/hosts", protect, hostRouter);
// app.get('/api/animals', animalRouter);
// app.get('/api/animals/:id', animalRouter);
app.use("/api/animals", animalRouter);
app.use("/api/shelters", protect, shelterRouter);
app.use('/api/images/', imageRouter);

module.exports.start = async () => {
  try {
    await connect();
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};
