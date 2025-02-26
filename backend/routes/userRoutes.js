const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Αλλάξαμε το "register" σε "signup"
router.post("/signup", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", verifyToken, UserController.getUserProfile);

// ✅ Διαδρομές μόνο για Admin
router.get("/admin/users", verifyToken, verifyAdmin, UserController.getAllUsers);
router.delete("/admin/users/:id", verifyToken, verifyAdmin, UserController.deleteUser);

module.exports = router;
