const express = require("express");
const { imageUploaderValidation } = require("../validations");
const { imageUploaderService } = require("../services");

const router = express.Router();

router.post(
  "/fruits/",
  imageUploaderValidation.fruitsImageValidation,
  imageUploaderService.imageUpload
);

module.exports = router;
