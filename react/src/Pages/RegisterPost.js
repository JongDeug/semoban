import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "../css/registerPost.css";
import Tags from '../Components/Post/TagsInput';
import Error from "../Components/ErrorMessage";

function RegisterPost() {
  // const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [location, setLocation] = useState(useLocation());
  console.log(location);
  const [boardOption, setBoardOption] = useState(location.state.boardtype);
  const boardOptionList = [
    "자유 게시판",
    "자랑 게시판",
    "정보 공유 게시판",
    "질문 게시판",
  ];
  const [attachedFile, setAttachedFile] = useState("");
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidContent, setIsValidContent] = useState(false);

  const frm = new FormData();

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  const onKeywordsHandler = (event) => {
    setKeywords(event.currentTarget.value);
  };

  const onAttachedFileHandler = (event) => {
    const { files } = event.currentTarget;
    setAttachedFile(files);
  };

  function onBoardOption(event) {
    setBoardOption(event.target.value);
  }

  const onTitleValidCheck = (event) => {
    const checkTitle = event.currentTarget.value;
    if (checkTitle === "") {
      setIsValidTitle(true);
      console.log(checkTitle);
    } else {
      setIsValidTitle(false);
      console.log(checkTitle);
    }
  };

  const onContentValidCheck = (event) => {
    const checkContent = event.currentTarget.value;
    if (checkContent === "") {
      setIsValidContent(true);
      console.log(checkContent);
    } else {
      setIsValidContent(false);
      console.log(checkContent);
    }
  };

  function requestPost() {
    const token = sessionStorage.getItem("accessToken");
    let route;
    console.log(boardOption);
    if(boardOption === "질문 게시판"){
      route = "boardQuestion";
    }else if(boardOption === "자유 게시판"){
      route = "boardAnything";
    }else if(boardOption === "자랑 게시판"){
      route = "boardBoast";
    }else if(boardOption === "정보 공유 게시판"){
      route = "boardInformation"
    }
    frm.append('postTitle', JSON.stringify(title));
    frm.append('postContent', JSON.stringify(content));
    frm.append('keywords', JSON.stringify(keywords));

    Array.from(attachedFile).forEach(file => {
      frm.append('attachedFile', file);
    });

    return axios({
      url: `/api/${route}/manage`,
      method: "post",
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
      data: frm, 
    })
      .then((res) => {
        console.log(res.data.responseData.result["_id"]);
        // const postId = res.data.responseData.result["_id"];
        return res.data.responseData.redirect;
      })
      .then((res) => {
        window.location = `${res}`;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 setcenter">
          <h2 className="text-center mt-5">게시글 작성</h2>

          <form>
            <div className="form-group">
              <select value={boardOption} onChange={onBoardOption}>
                {boardOptionList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label for="title">
                제목 <span className="require"></span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={onTitleHandler}
                onBlur={onTitleValidCheck}
              />
              <Error className="error_text" visibility={isValidTitle}>
                <span>제목을 입력해주세요.</span>
              </Error>
            </div>

            <div className="form-group">
              <label for="description">내용</label>
              <textarea
                rows="10"
                className="form-control"
                id="content"
                name="content"
                onChange={onContentHandler}
                onBlur={onContentValidCheck}
              ></textarea>
              <Error className="error_text" visibility={isValidContent}>
                <span>내용을 입력해주세요.</span>
              </Error>
            </div>

            <div className="form-group">
              <label for="attachedFile" className="form-label">
                첨부파일
              </label>
              <input
                type="file"
                id="attachedfile"
                name="attachedFile"
                className="form-control"
                multiple
                onChange={onAttachedFileHandler}
              ></input>
            </div>

            <div className="form-group">
              <label for="keyword" className="form-label">
                키워드
              </label>
              <Tags keywords={keywords} setKeywords={setKeywords}></Tags>
              {/* <input
                type="text"
                id="keyword"
                className="form-control"
                onChange={onKeywordsHandler}
              ></input> */}
            </div>
            <div class="form-group mt-5 ">
              <button
                // type="submit"
                type="button"
                className="btn btn-success"
                onClick={requestPost}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPost;