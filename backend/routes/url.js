const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url');
const Url = require('../models/Url');

const router = express.Router();

// @route   POST /api/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Check base URL
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

  // Check if long URL is valid
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('Invalid long URL');
  }

  try {
    // Check if URL already exists
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      // Generate short code
      const shortCode = shortid.generate();

      // Create new URL document
      url = new Url({
        longUrl,
        shortCode,
        shortUrl: `${baseUrl}/${shortCode}`,
      });

      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

// @route   GET /api/urls
// @desc    Get all URLs (for admin page)
router.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

module.exports = router;
