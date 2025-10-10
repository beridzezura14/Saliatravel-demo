const express = require("express");
const Require = require("../models/Require");
const verifyToken = require("../middleware/verifyToken"); // თუ გინდა Admin panel-ზე დაცვა

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const requires = await Require.find().sort({ createdAt: 1 });
    res.json(requires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  try {
    const reqItem = await Require.findById(req.params.id);
    if (!reqItem) return res.status(404).json({ message: "Not found" });
    res.json(reqItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newRequire = new Require(req.body);
    const saved = await newRequire.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Require.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Require.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
