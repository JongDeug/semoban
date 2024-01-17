const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  postId: {
    type: Number,
    required: false,
    //ref: "Post",
  },
  newsId: {
    type: Number,
    required: false,
    //ref: "News",
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
}, {
  versionKey: false
});

module.exports = mongoose.model("AttachedFile", userSchema);
