const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  userId: {
    type: String,
    required: true,
    //ref: "Member",
  },
  myPostId: {
    type: Number,
    required: false,
    //ref: "Post",
  },
  myCommentId: {
    type: Number,
    required: false,
    //ref: "Comment",
  },
  myLikePostId: {
    type: Number,
    required: false,
    //ref: "Post",
  },
}, {
  versionKey:false
});

module.exports = mongoose.model("MemberActivity", userSchema);
