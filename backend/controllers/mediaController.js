const Media = require('../models/media');

exports.getAllMedia = async (req, res) => {
  try {
    // await Media.deleteMany();
    const media = await Media.find({});
    res.status(200).json({ success: true, media });
  } catch (error) {
    // res.status(400).json(error);
  }
};

exports.uploadMedia = async (req, res) => {
  try {
    let videoPaths = [];
    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
      for (let video of req.files.videos) {
        videoPaths.push('\\' + video.path);
        const mediaCreated = await Media.insertMany([
          {
            videos: videoPaths,
            name: video.originalname,
            size: (video.size / 1024 / 1024).toFixed(2),
          },
        ]);

        res.status(200).json({ success: true, mediaCreated });
      }
    }
  } catch (error) {}
};
