const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello From Home Page");
});

app.get('/about', (req, res) => {
    const name = req.query.name || 'Guest';
    return res.send(`Hello ${name}`);
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});