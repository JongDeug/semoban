const mongoose = require("mongoose");
const schema = mongoose.Schema;
const getDateTime = require('../config/timezone');

const userSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: false,
  },
  postTime: {
    type: String,
    // required: true,
    default: getDateTime()
  },
  postType: {
    type: String,
    default: "자유 게시판"
  },
  hit: {
    type: Number,
    default: 0
  },
  likeHit: {
    type: [String],
    // required: false,
  },
  likeHitBool: {
    type: Boolean
  },
  keywords: {
    type: [String],
    required: true,
  },
  attachedFile: {
    type: [String],
  }
}, {
  versionKey: false
});

// 개념은 아직 잘 이해가 가지 않지만 일단 인덱싱하면 빨라짐. 
userSchema.index({ likeHit: 1 });
module.exports = mongoose.model("PostAnything", userSchema);
