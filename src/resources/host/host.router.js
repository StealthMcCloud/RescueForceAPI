const express = require("express");
const { controllers, filters } = require("./host.controllers");
const upload = require("../../utils/imageUpload");
const { hostAndShelterOnly, shelterOnly } = require("../../utils/auth");

const router = express.Router();

router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route("/:id")
  .get(filters.viewHost, controllers.getOne)
  .put(filters.viewHost, controllers.updateOne)
  .delete(shelterOnly, controllers.removeOne);

router
  .route("/:id/photos")
  .get(controllers.getPhotos)
  .post(hostAndShelterOnly, upload.array("image", 1), controllers.addPhoto)
  .delete(hostAndShelterOnly, controllers.removePhoto);

module.exports = router;
