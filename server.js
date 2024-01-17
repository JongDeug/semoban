require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { reqLogger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/dbConn");
const Variable = require("./model/Variable");
const Crawler = require("./middleware/crawler");
const fs = require("fs");
const PORT = 3500;

// uploads 파일 생성
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// DB Variable 하나 생성
// Variable.create({});

connectDB();
Crawler.crawler(); // 주기랑 다시 설정해야함.

// middleware
app.use(express.urlencoded({ extended: false })); // true일 경우 qs 라이브러리 사용
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(reqLogger);

// serve static files
// <test>
// app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", express.static(path.join(__dirname, "React/build/"))); // /~.png
app.use("/", express.static(path.join(__dirname, "uploads"))); // uploads/~.png

// route
// app.use('/', require('./routes/root_test'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'React/build/index.html'));
});

// 이미지
app.get('/uploads/:img', (req, res) => {
    const img = req.params.img;
    console.log(img);
    res.sendFile(path.join(__dirname, `uploads/${img}`));
})

// 로그인 무
app.use("/boardAnything", require("./routes/boardAnything"));
app.use("/boardInformation", require("./routes/boardInformation"));
app.use("/boardQuestion", require("./routes/boardQuestion"));
app.use("/boardBoast", require("./routes/boardBoast"));
app.use("/popularityPosts", require("./routes/popularityPosts"));
app.use("/news", require("./routes/newsAPI"));

app.use("/auth", require('./routes/auth'));
app.use("/adminAuth", require('./routes/adminAuth'));
// 로그인 유 (유저, 관리자 전용)
app.use(verifyJWT);
app.use("/api/member", require("./routes/api/memberAPI"));
app.use("/api/memberActivity", require("./routes/api/memberActivityAPI"));

app.use("/api/boardAnything", require("./routes/api/boardAnythingAPI"));
app.use("/api/boardInformation", require("./routes/api/boardInformationAPI"));
app.use("/api/boardQuestion", require("./routes/api/boardQuestionAPI"));
app.use("/api/boardBoast", require("./routes/api/boardBoastAPI"));

app.use("/api/recommendPosts", require("./routes/api/recommendPostsAPI"));
app.use("/api/notice", require("./routes/api/noticeAPI"));
app.use("/api/news", require("./routes/api/newsKeywordAPI"));

// 로그인 유 (관리자 전용)
app.use("/api/adminMember", require("./routes/api/adminMemberAPI"));
app.use("/api/adminAdjust", require("./routes/api/adminAdjustAPI"));

// middleware
app.use(errorHandler);

// db connect, server connect
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
});

// client-side redering (Server에서 설정한 url외에 전적으로 React에 라우팅을 넘김)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'React/build/index.html'));
});