

// uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Set up storage for images with renaming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        const newFilename = `${uniqueSuffix}${ext}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

// Middleware for handling multiple image uploads
const uploadImagesMiddleware = upload.array('productimage', 10); // Adjust the max number of files as needed

module.exports = uploadImagesMiddleware;

