const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error: ", err));


app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.get('/songs', (req, res) => {
    const assetsPath = path.join(__dirname, 'assets');
    fs.readdir(assetsPath, (err, files) => {
        if (err) return res.status(500).json({ message: 'Error loading songs' });
        const songs = files.map(file => ({ title: file, filePath: `/assets/${file}` }));
        res.json(songs);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
