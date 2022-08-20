const multer = require('multer');
const fs = require('fs');
const path = require('path');
const CustomApiErrorHandler = require('../middleware/CustomApiErrorHandler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }

    cb(null, 'public/videos');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    if (extension !== '.mkv' && extension !== '.mp4') {
      return cb(new CustomApiErrorHandler('Only videos are allowed!', 400));
    }
    cb(null, true);
  },
});

module.exports = upload;
