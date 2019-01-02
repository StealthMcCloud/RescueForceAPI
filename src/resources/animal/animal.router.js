const express = require("express");
const controllers = require("./animal.controllers");
const { protect } = require("../../utils/auth");
const upload = require("../../utils/imageUpload");

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

router
  .route("/:id/photos")
  .get(controllers.getPhotos)
  .post(protect, upload.array("image", 1), controllers.addPhoto)
  .delete(protect, controllers.removePhoto);

module.exports = router;
