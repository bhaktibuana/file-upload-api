const { response } = require("../utils");

const { resError } = response;

const fruitsImageValidation = (req, res, next) => {
  const imageName = req.query.imageName;
  const tempImageName = imageName.split(".");
  const imageType = tempImageName[tempImageName.length - 1];

  if (
    imageType === "jpg" ||
    imageType === "JPG" ||
    imageType === "jpeg" ||
    imageType === "JPEG" ||
    imageType === "png" ||
    imageType === "PNG"
  ) {
    next();
  } else {
    resError("Invalid image name extension", 400, null, res);
  }
};

module.exports = {
  fruitsImageValidation,
};
