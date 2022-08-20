const express = require('express');
const { getAllMedia, uploadMedia } = require('../controllers/mediaController');
const upload = require('../middleware/multer');
const path = require('path');
const Video = require('../models/video');

const router = express();

router.route('/all').get(getAllMedia);
router.route('/create').post(
  upload.fields([
    {
      name: 'videos',
      maxCount: 8,
    },
  ]),
  uploadMedia
);

router.post('/download', async function (req, res) {
  const { name } = req.body;
  await Video.create({ name });

  const file = path.resolve(__dirname, `../public/videos/${name}`);

  res.download(file);
});

module.exports = router;
