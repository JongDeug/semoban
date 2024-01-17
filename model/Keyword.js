const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  keywords: {
    type: String,
    required: false,
  },
}, {
  versionKey:false
});

module.exports = mongoose.model("Keyword", userSchema);
