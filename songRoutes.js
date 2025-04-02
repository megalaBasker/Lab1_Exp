const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Song = require('../models/Song');

router.get('/songs', async(req, res) => {
    try {
        const songs = await Song.find(); 
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching songs' });
    }
});

module.exports = router;