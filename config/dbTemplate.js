const PostAnything = require("../model/PostAnything");
const PostBoast = require("../model/PostBoast");
const PostInformation = require("../model/PostInformation");
const PostQuestion = require("../model/PostQuestion");
const Post = {
    "anything": PostAnything,
    "boast": PostBoast,
    "information": PostInformation,
    "question": PostQuestion
}

const CommentAnything = require("../model/CommentAnything");
const CommentBoast = require("../model/CommentBoast");
const CommentInformation = require("../model/CommentInformation");
const CommentQuestion = require("../model/CommentQuestion");
const Comment = {
    "anything": CommentAnything,
    "boast": CommentBoast,
    "information" : CommentInformation,
    "question" : CommentQuestion
}

module.exports = {Post, Comment}