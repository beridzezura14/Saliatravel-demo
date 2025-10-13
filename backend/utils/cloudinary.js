const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'travel-places', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  },
});

const parser = multer({ storage });

module.exports = { cloudinary, parser };