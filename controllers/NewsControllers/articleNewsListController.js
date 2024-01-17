const News = require("../../model/News");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
  try {
    const result = await News.find();
    const responseData = responseDataForm(
      null,
      "News get request complete",
      result
    );
    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
