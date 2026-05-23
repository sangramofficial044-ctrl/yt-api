const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("YouTube MP4 API Running 🚀");
});

app.get("/video", async (req, res) => {

  try {

    const url = req.query.url;

    if (!url) {
      return res.json({
        error: "YouTube URL required"
      });
    }

    const info = await ytdl.getInfo(url);

    const format = ytdl.chooseFormat(
      info.formats,
      {
        quality: "18"
      }
    );

    res.json({
      title: info.videoDetails.title,
      thumbnail:
        info.videoDetails.thumbnails.pop().url,

      mp4: format.url
    });

  } catch (err) {

    res.json({
      error: err.message
    });

  }

});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
