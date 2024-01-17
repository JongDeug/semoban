const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    newsTitle: {
      type: String,
      required: true,
    },
    newsSourceLink: {
      type: String,
      required: false,
    },
    newsNaverLink: {
      type: String,
      required: false,
    },
    newsContent: {
      type: String,
      required: false,
    },
    newsDescription: {
      type: String,
      required: false,
    },
    newsImageURL: {
      type: Array,
      required: false,
    },
    newsPubDate: {
      type: String,
      required: false,
    },
    keyword: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("KeywordNews", userSchema);
