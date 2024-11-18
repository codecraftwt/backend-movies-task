const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: 'dwwykeft2',
  api_key: '171225899953946',
  api_secret: 'cNv0XKbJqqg10440xozFTLZVrrk',
});

module.exports = cloudinary;
