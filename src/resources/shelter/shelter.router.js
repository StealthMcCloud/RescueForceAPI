const express = require("express");
const controllers = require("./shelter.controllers");
const upload = require("../../utils/imageUpload");

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

router
  .route("/:id/photos")
  .get(controllers.getPhotos)
  .post(upload.array("image", 1), controllers.addPhoto)
  .delete(controllers.removePhoto);

module.exports = router;
