const express = require("express");
const controllers = require("./shelter.controllers");
const upload = require("../../utils/imageUpload");
const { shelterOnly } = require("../../utils/auth");

const router = express.Router();

router
  .route("/")
  .get(controllers.getMany)
  .post(shelterOnly, controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOne)
  .put(shelterOnly, controllers.updateOne)
  .delete(shelterOnly, controllers.removeOne);

router
  .route("/:id/photos")
  .get(controllers.getPhotos)
  .post(shelterOnly, upload.array("image", 1), controllers.addPhoto)
  .delete(shelterOnly, controllers.removePhoto);

module.exports = router;
