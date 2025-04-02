const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: String,
    filePath: String,
    coverImage: String, 
});

module.exports = mongoose.model('Song', SongSchema);