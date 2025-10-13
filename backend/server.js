const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env') });


const app = express();

app.use(cors({ origin: "*" })); // ან შენი frontend URL
app.use(express.json());

// Routes
const authRouter = require('./routes/auth');
const placesRouter = require('./routes/places');
const countryRoutes = require('./routes/countries');
const requireRoutes = require("./routes/requires");
const toursRoutes = require("./routes/tours");
const contactRoutes = require('./routes/contact');
const instaRoutes = require("./routes/insta");


const initAdmin = require("./utils/initAdmin");
initAdmin();

app.use("/api/insta", instaRoutes);
app.use('/api/auth', authRouter);
app.use('/api/places', placesRouter);
app.use('/api/countries', countryRoutes);
app.use("/api/requires", requireRoutes);
app.use("/api/tours", toursRoutes);
app.use('/api/contacts', contactRoutes);
app.use("/api/insta", instaRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err));



  console.log(process.env.MONGO_URI); 
// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route – **მხოლოდ React routes–ისთვის**
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
