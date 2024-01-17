const VideoNews = require("../../model/VideoNews");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
  try {
    const result = await VideoNews.find();
    const responseData = responseDataForm(
      null,
      "Video News List get request complete",
      result
    );
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
