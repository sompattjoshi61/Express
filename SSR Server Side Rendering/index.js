const express = require('express');
const app = express();
const URL = require('./models/url');

// MongoDB connection
const connectToMongoDB = require('./connect');
connectToMongoDB('mongodb://localhost:27017/urlshortner')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

const urlRoutes = require('./routes/url');
const PORT = 8001;

// Middleware
app.use(express.json());

// Test Route (HTML rendering)
app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});

    res.send(`
        <html>
            <head>
                <title>All URLs</title>
            </head>
            <body>
                <h2>Stored URLs</h2>

                <ol>
                    ${allUrls.map(url => `
                        <li>
                            ${url.shortId} →
                            ${url.redirectUrl} →
                            ${url.visitHistory.length}
                        </li>
                    `).join('')}
                </ol>

            </body>
        </html>
    `);
});

// API Routes
app.use('/url', urlRoutes);

// Redirect Route
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const url = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!url) {
        return res.status(400).json({ error: 'URL not found' });
    }

    return res.redirect(url.redirectUrl);
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
