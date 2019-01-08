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
  .patch(filters.viewHost, controllers.updateOne)
  .delete(shelterOnly, controllers.removeOne);

router
  .route("/:id/photos")
  // .get(controllers.getPhotos)
  .put(hostAndShelterOnly, upload.single("image"), controllers.replacePhoto)
  // .delete(hostAndShelterOnly, controllers.removePhoto);

module.exports = router;
