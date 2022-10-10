const express = require("express");

const bidController = require("../controllers/bidController");

const router = express.Router();

router.post("/", bidController.createBid);

router.get("/:id", bidController.getBid);

module.exports = router;
