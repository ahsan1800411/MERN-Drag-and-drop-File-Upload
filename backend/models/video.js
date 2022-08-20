const mongoose = require('mongoose');

const videoScehma = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Video', videoScehma);
