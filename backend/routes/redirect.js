const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// @route   GET /:shortcode
// @desc    Redirect to long URL
router.get('/:shortcode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortcode });

    if (url) {
      // Increment click count
      url.clicks++;
      await url.save();
      
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

module.exports = router;
