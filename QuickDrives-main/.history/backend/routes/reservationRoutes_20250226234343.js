const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");
const Car = require("../models/Car");

const router = express.Router();

// 🔹 Επιστροφή κρατήσεων του συνδεδεμένου χρήστη
router.get("/user", verifyToken, async (req, res) => {
    try {
        const userReservations = await Reservation.findAll({
            where: { user_id: req.user.userId },
            include: [{ model: Car, attributes: ["brand", "model", "price_per_day", "image_url"] }]
        });

        return res.status(200).json({ reservations: userReservations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "❌ Σφάλμα κατά την ανάκτηση των κρατήσεων." });
    }
});

module.exports = router;
