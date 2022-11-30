const express = require("express");
const { api } = require("../../config");
const fruitsRoute = require("./fruits.route");
const imageUploaderRoute = require("./imageUploader.route");

const router = express.Router();

router.use(`${api.v1}/fruits`, fruitsRoute);
router.use(`${api.v1}/image`, imageUploaderRoute);

router.use("/", (_, res) => {
  res.status(200).json({
    message: "File Upload API Development Server.",
  });
});

module.exports = router;
