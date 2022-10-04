const express = require("express");

const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/adminlogin", authController.adminLogin);
router.get("/me", authenticate, authController.getMe);
router.get("/isadmin", authenticateAdmin, authController.getAdmin);
// router.get("/adminlogin", authController.adminLogin);
// router.get("/isadmin", authController.getAdmin);

module.exports = router;
