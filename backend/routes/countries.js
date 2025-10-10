// routes/countries.js
const express = require('express');
const Country = require('../models/Country');
const { parser } = require('../utils/cloudinary');

const router = express.Router();

// CREATE - ახალი ქვეყანა
router.post('/', parser.single('image'), async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file.path; // Cloudinary URL

    const newCountry = new Country({ title, image });
    await newCountry.save();

    res.status(201).json(newCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ - ყველა ქვეყანა
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find().sort({ createdAt: 1 }); // ძველი -> ახალი
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// UPDATE - რედაქტირება
router.put('/:id', parser.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedData = { title };
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedCountry = await Country.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedCountry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - წაშლა
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Country.findByIdAndDelete(id);
    res.json({ message: 'Country deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
