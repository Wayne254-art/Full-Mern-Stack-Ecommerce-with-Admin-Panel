

// controllers/uploadProductImageController.js

const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Rename the file
    }
});

const upload = multer({ storage: storage }).single('productImage');

const uploadProductImageController = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message, error: true, success: false });
        } else if (err) {
            return res.status(500).json({ message: "Failed to upload image", error: true, success: false });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded", error: true, success: false });
        }

        // If the file is uploaded successfully
        res.status(200).json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            url: `http://localhost:8080/uploads/${req.file.filename}` // Return the file URL
        });
    });
};

module.exports = uploadProductImageController;
