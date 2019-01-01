const express = require("express");
const controllers = require("./animal.controllers");
const { protect } = require('../../utils/auth');

const router = express.Router();

router
  .route("/")
  .get(controllers.getMany)
  .post(protect, controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOneById)
  .put(protect, controllers.updateOne)
  .delete(protect, controllers.removeOne);

module.exports = router;
