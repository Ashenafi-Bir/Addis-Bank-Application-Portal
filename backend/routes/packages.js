const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();

const Packages = require('../models/Packages'); 

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create a new Board Trustee
router.post('/', upload.single('image'), async (req, res) => {
  const newPackage = req.body;

  if (req.file) {
    newPackage.packageImage = `/images/${req.file.filename}`; 
  }

  try {
    const createdPackage = await Packages.create(newPackage);
    res.json(createdPackage);
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).json({ error: 'Failed to insert data into the database' });
  }
});

// Get all Board Trustees
router.get('/', async (req, res) => {
  try {
    console.log("gate data")
    const listOfPackages = await Packages.findAll();
    res.json(listOfPackages);
  } catch (error) {
    console.error('Error fetching Board Trustees:', error);
    res.status(500).json({ error: 'Failed to fetch Board Trustees' });
  }
});

// Get a single Board Trustee by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const package = await Packages.findByPk(id);
    if (package) {
      res.json(package);
    } else {
      res.status(404).json({ error: 'Board Trustee not found' });
    }
  } catch (error) {
    console.error('Error fetching Board Trustee:', error);
    res.status(500).json({ error: 'Failed to fetch Board Trustee' });
  }
});

// Update a Board Trustee by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const newDetails = req.body;
  const file = req.file;

  try {
    const package = await Packages.findByPk(id);
    if (!package) {
      return res.status(404).json({ error: 'Board Trustee not found' });
    }

    if (file) {
      // Delete old image if it exists
      if (package.packageImage) {
        const oldImagePath = path.join(__dirname, '..', 'public', package.packageImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      newDetails.packageImage = `/images/${file.filename}`;
    }
    await Packages.update(newDetails, { where: { id } });
    const updatedPackage = await Packages.findByPk(id);
    res.json(updatedPackage);
  } catch (error) {
    console.error('Error updating Board Trustee:', error);
    res.status(500).json({ error: 'Failed to update Board Trustee' });
  }
});

// Delete a Board Trustee by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Find the BoardTrustee record to get the image filename
    const package = await Packages.findByPk(id);
    if (!package) {
      return res.status(404).json({ error: 'Board Trustee not found' });
    }

    // Construct the path to the image file in the 'public/images' directory
    if (package.packageImage) {
      const imagePath = path.join(__dirname, '..', 'public', package.packageImage);

      console.log('Constructed Image Path:', imagePath);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('Image successfully deleted.');
      } else {
        console.log('Image file does not exist.');
      }
    } else {
      console.log('No image to delete.');
    }

    await Packages.destroy({ where: { id } });

    res.json({ message: 'Board Trustee deleted successfully' });
  } catch (error) {
    console.error('Error deleting Board Trustee:', error);
    res.status(500).json({ error: 'Failed to delete Board Trustee' });
  }
});
module.exports = router;



