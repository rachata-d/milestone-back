const express = require("express");

const lotController = require("../controllers/lotController");

const router = express.Router();

router.route("/").post(lotController.createLot);

module.exports = router;
