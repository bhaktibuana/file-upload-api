const multer = require("multer");
const { fileNameGenerator, response } = require("../utils");

const { resSuccess, resError } = response;

const imageUpload = (req, res) => {
  const rawImageName = req.query.imageName;
  const fileName = fileNameGenerator("fruit", rawImageName);

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/images/fruits");
    },
    filename: (req, file, callback) => {
      callback(null, fileName);
    },
  });

  const upload = multer({ storage }).single("fruits_image");

  upload(req, res, (error) => {
    if (!error) {
      resSuccess("Upload file success", 201, { imageName: fileName }, res);
    } else {
      resError("Failed to upload file", 500, error, res);
    }
  });
};

module.exports = {
  imageUpload,
};
