const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Middleware JSON body parsing (თუ server.js-ში არა გაქვთ)
router.use(express.json());

// CREATE - ახალი კონტაქტი
router.post('/', async (req, res) => {
  try {
    const { address, phone, email, mapEmbed } = req.body;

    const newContact = new Contact({ address, phone, email, mapEmbed });
    await newContact.save();

    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ - ყველა კონტაქტი
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: 1 }); // ძველი -> ახალი
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ - ერთი კონტაქტი ID-ის მიხედვით
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE - რედაქტირება
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { address, phone, email, mapEmbed } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { address, phone, email, mapEmbed },
      { new: true }
    );

    if (!updatedContact)
      return res.status(404).json({ error: 'Contact not found' });

    res.json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - წაშლა
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: 'Contact not found' });

    res.json({ message: 'Contact deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 Export router
module.exports = router;
