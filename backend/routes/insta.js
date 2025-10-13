const express = require("express");
const router = express.Router();
const Insta = require("../models/Insta");
const { parser } = require("../utils/cloudinary");

// CREATE
router.post("/", parser.single("image"), async (req, res) => {
  try {
    const { title, price, link } = req.body;
    if (!req.file || !link)
      return res.status(400).json({ message: "Image და Link აუცილებელია!" });

    const newInsta = new Insta({
      image: req.file.path,
      title,
      price,
      link,
    });

    await newInsta.save();
    res.status(201).json(newInsta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const items = await Insta.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE (PUT) – სურათის მხარდაჭერით
router.put("/:id", parser.single("image"), async (req, res) => {
  try {
    const { title, price, link } = req.body;
    const item = await Insta.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (req.file) item.image = req.file.path; // ახალი სურათი თუ იყო
    if (title) item.title = title;
    if (price) item.price = price;
    if (link) item.link = link;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Insta.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "ჩანაწერი ვერ მოიძებნა" });
    res.status(200).json({ message: "წაიშალა წარმატებით" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
