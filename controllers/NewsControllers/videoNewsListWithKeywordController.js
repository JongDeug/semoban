const KeywordVideoNews = require("../../model/KeywordVideoNews");
const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");
const { User } = require("../../config/roles_list");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  try {
    const getUser = await Member.findOne({ userId: getUserId });
    const getKeyword = getUser.interestKeywords;
    let keywordSize = getKeyword.length;
    const resultList = [];

    for (let i = 0; i < keywordSize; i++) {
      let x = getKeyword[i].replace(/#/g, "");
      x = x.replace(/ /g, "");
      const tempResult = await KeywordVideoNews.find({
        $or: [
          {
            newsTitle: { $regex: x, $options: "i" },
          },
          {
            newsDescription: { $regex: x, $options: "i" },
          },
        ],
      });
      if (tempResult.length > 0) {
        Object.assign(resultList, tempResult);
      }
    }
    const responseData = responseDataForm(
      null,
      "Video News With Key get request complete",
      resultList
    );
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
