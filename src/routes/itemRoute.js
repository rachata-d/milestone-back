const express = require("express");

const upload = require("../middlewares/upload");

const itemController = require("../controllers/itemController");

const router = express.Router();

router
  .route("/")
  .post(upload.single("picture"), itemController.createItem)
  .get(itemController.getAllItems)
  .patch(itemController.updateItems);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
