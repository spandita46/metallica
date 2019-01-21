const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");

const { authenticate } = require("../middleware/authenticate");

router.post("/users", User.registerUser);
router.get("/users/me", authenticate, User.profile);
router.post("/users/login", User.login);
router.delete("/users/me/token", authenticate, User.logout);

module.exports = router;
