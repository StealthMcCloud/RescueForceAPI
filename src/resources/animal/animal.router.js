const express = require("express");
const { controllers, filters } = require("./animal.controllers");
const upload = require("../../utils/imageUpload");
const { hostAndShelterOnly, shelterOnly } = require("../../utils/auth");

const router = express.Router();

router
  .route("/")
  .get(filters.viewAnimals, controllers.getMany)
  .post(shelterOnly, controllers.createOne);

router
  .route("/:id/photos")
  .patch(upload.array("images", 7), controllers.addPhoto);

router
  .route("/:id")
  .get(filters.viewAnimal, controllers.getOne)
  .patch(hostAndShelterOnly, controllers.updateOne)
  .delete(shelterOnly, controllers.removeOne);

module.exports = router;
