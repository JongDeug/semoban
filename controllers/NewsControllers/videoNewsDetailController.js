const VideoNews = require("../../model/VideoNews");
const KeywordVideoNews = require("../../model/KeywordVideoNews");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
  const videoNewsId = req.params.videoNewsId;
  try {
    const result1 = await VideoNews.findById(videoNewsId).exec();
    const result2 = await KeywordVideoNews.findById(videoNewsId);
    let result = result1;

    if (!result1) {
      result = result2;
    }

    if (!result) {
      result = await KeywordVideoNews.findById(videoNewsId);
    }
    const responseData = responseDataForm(
      null,
      "Video News By ID get request complete",
      result
    );
    console.log(result);
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
