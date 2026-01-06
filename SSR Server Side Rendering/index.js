const express = require('express');
const app = express();
const URL = require('./models/url');
const path = require('path');
const staticRoute = require('./routes/staticRouter');

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

    //Setting up EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


const urlRoutes = require('./routes/url');
const PORT = 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/url', urlRoutes);

app.use("/", staticRoute);

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
