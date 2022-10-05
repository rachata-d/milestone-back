const express = require("express");

const itemController = require("../controllers/itemController");

const router = express.Router();

router
  .route("/")
  .post(itemController.createItem)
  .get(itemController.getAllItems);

module.exports = router;
