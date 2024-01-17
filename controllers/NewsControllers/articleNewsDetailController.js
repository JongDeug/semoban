const News = require("../../model/News");
const KeywordNews = require("../../model/KeywordNews");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
  const newsId = req.params.newsId;
  try {
    // const result = await News.findById(newsId).exec();
    const result1 = await News.findById(newsId).exec();
    const result2 = await KeywordNews.findById(newsId);
    let result = result1;

    if (!result1) {
      result = result2;
    }
    const responseData = responseDataForm(
      null,
      "News get request complete",
      result
    );
    console.log(result);
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
