const mongoose = require('mongoose');

const mediaScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },

    videos: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', mediaScehma);
