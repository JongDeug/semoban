const KeywordNews = require("../../model/KeywordNews");
const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");
const { User } = require("../../config/roles_list");
const Crawler = require("../../middleware/crawler");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  try {
    const getUser = await Member.findOne({ userId: getUserId });
    const getKeyword = getUser.interestKeywords;

    let keywordSize = getKeyword.length;
    const resultList = [];

    /*  //  키워드 적용 시 크롤링 x
    for (let i = 0; i < keywordSize; i++) {
      Crawler.naverNewsWithKeyword(1, getKeyword[i].replace(/#/g, ""));
    }
    */

    for (let i = 0; i < keywordSize; i++) {
      let x = getKeyword[i].replace(/#/g, "");
      x = x.replace(/ /g, "");
      const tempResult = await KeywordNews.find({
        $or: [
          {
            newsTitle: { $regex: x, $options: "i" },
          },
          {
            newsDescription: { $regex: x, $options: "i" },
          },
        ],
      });
      // console.log(tempResult);
      if (tempResult.length > 0) {
        Object.assign(resultList, tempResult);
      }
    }
    const responseData = responseDataForm(
      null,
      "News With Key get request complete",
      resultList
    );
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
