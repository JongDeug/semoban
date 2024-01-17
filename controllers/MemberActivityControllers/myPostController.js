const responseDataForm = require("../../config/responseDataForm");
const DB = require("../../config/dbTemplate");

const getMethod = async (req, res, next) => {
  const getUserId = req.userId;
  const result = {};
  try {

    for (const key in DB.Post) {
      result[key] = await DB.Post[key].find({ userId: getUserId });
    }

    const responseData = responseDataForm(
      null,
      "board get request complete",
      result
    );

    res.status(200).json({ responseData });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMethod };
