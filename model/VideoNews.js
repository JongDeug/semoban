const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    newsTitle: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: false,
    },
    newsDescription: {
      type: String,
      required: false,
    },
    thumbnailURL: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("VideoNews", userSchema);
