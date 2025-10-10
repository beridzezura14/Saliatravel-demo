const express = require("express");
const Tour = require("../models/Tour");
const verifyToken = require("../middleware/verifyToken");
const { parser } = require("../utils/cloudinary"); // Cloudinary parser

const router = express.Router();

// ========================= READ ALL =========================
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ========================= READ ONE =========================
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ========================= CREATE =========================
router.post("/", verifyToken, parser.single("imgFile"), async (req, res) => {
  try {
    const { head, includes, details } = req.body;
    const img = req.file ? req.file.path : "";

    const tour = new Tour({
      head,
      includes,
      details: typeof details === "string" ? JSON.parse(details) : details,
      img,
    });

    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ========================= UPDATE =========================
router.put("/:id", verifyToken, parser.single("imgFile"), async (req, res) => {
  try {
    const { head, includes, details } = req.body;
    const updateData = {
      head,
      includes,
      details: typeof details === "string" ? JSON.parse(details) : details,
    };

    if (req.file) updateData.img = req.file.path;

    const updated = await Tour.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Tour not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ========================= DELETE =========================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
