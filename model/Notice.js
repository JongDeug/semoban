const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true
  },
  commentId: {
    type: String,
    required: true,
  },
  check:{
    type: Boolean,
    required: true,
    default: false,
  }

}, {
  versionKey: false
});

module.exports = mongoose.model("Notice", userSchema);
