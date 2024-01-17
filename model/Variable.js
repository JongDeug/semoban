const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        likeVar: {
            type: Number,
            default: 1,
        },
        likePage: {
            type: Number,
            default: 2,
        },
        keywordVar: {
            type: Number,
            default: 3,
        },
        newsVar: {
            type: Number,
            default: 20,
        },
        tableId : {
            type: Number,
            default: 1
        }
    },
    {
        versionKey: false,
    }
);
module.exports = mongoose.model("Variable", userSchema);