const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sequelize = require("./config/database");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);
app.use("/contact", contactRoutes);
app.use("/cars", carRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Η βάση δεδομένων είναι συγχρονισμένη!");
}).catch(err => {
    console.error("❌ Σφάλμα στη βάση:", err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
