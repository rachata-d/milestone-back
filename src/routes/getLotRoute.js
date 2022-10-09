const express = require("express");

const lotController = require("../controllers/lotController");

const router = express.Router();

router.route("/").get(lotController.getLot);

module.exports = router;
