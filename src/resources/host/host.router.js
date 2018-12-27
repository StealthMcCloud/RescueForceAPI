const express = require("express");
const controllers = require("./host.controllers");

const router = express.Router();

router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOneById)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

module.exports = router;
