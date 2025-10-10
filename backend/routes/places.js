const express = require("express")
const router = express.Router()
const Place = require("../models/Place")
const verifyToken = require('../middleware/verifyToken')
const { parser } = require('../utils/cloudinary')

router.get("/", async (req, res) => {
    try {
        const places = await Place.find().sort({createdAt: 1})
        res.json(places)

    } catch (error) {
        console.log(error)
    }
})

// POST
router.post("/", verifyToken, parser.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body
    const imageUrl = req.file ? req.file.path : ''
    const newPlace = new Place({ title, description, imageUrl })
    await newPlace.save()
    res.status(201).json(newPlace)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT
router.put("/:id", verifyToken, parser.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body
    const updateData = { title, description }
    if (req.file) updateData.imageUrl = req.file.path

    const updated = await Place.findByIdAndUpdate(req.params.id, updateData, { new: true })
    if (!updated) return res.status(404).json({ message: 'Place not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.delete("/:id", verifyToken, async (req, res) => {
    try {
        
        const deleted = await Place.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).json({ message: 'Place not found' })
        res.json({ message: 'Deleted successfully' });
    
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})

module.exports = router;