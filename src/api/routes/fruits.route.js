const express = require("express");
const { fruitsMiddleware } = require("../middlewares");
const { fruitsController } = require("../controllers");

const router = express.Router();

router.get("/", fruitsMiddleware.countData, fruitsController.getData);
router.post("/", fruitsController.createData);

module.exports = router;
