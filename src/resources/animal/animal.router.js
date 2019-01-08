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
  .route("/:id")
  .get(filters.viewAnimal, controllers.getOne)
  .patch(hostAndShelterOnly, controllers.updateOne)
  .delete(shelterOnly, controllers.removeOne);

router
  .route("/:id/photos")
  // .get(controllers.getPhotos)
  .patch(upload.array("image", 5), controllers.addPhoto)
  // .delete(controllers.removePhoto);

module.exports = router;
