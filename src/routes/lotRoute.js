const express = require("express");

const lotController = require("../controllers/lotController");

const router = express.Router();

router.route("/").post(lotController.createLot).patch(lotController.updateLot);

module.exports = router;
