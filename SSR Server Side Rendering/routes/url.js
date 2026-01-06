const express = require('express');
const { handleGenerateShortUrl, handleGetAnalytics } = require('../controllers/url');
const URL = require('../models/url');
const router = express.Router();

router.post('/', handleGenerateShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

// Redirect route for shortened URLs
router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const url = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!url) {
        return res.status(404).send('URL not found');
    }

    return res.redirect(url.redirectUrl);
});

module.exports = router;
