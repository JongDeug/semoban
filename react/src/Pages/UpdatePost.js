import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../css/registerPost.css";
import { useParams } from 'react-router-dom';
import Tags from '../Components/Post/TagsInput';
import Error from "../Components/ErrorMessage";

function UpdatePost() {
  const params = useParams();
  const [postId, setPostId] = useState(params.postId);
  const [postBoard, setPostBoard] = useState(params.postType);
  const [post, setPost] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [attachedFile, setAttachedFile] = useState([]);
  const frm = new FormData();

  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidContent, setIsValidContent] = useState(false);

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  const onKeywordHandler = (event) => {
    setKeywords(event.currentTarget.value);
  }

  const onAttachedFileHandler = (event) => {
    const { files } = event.currentTarget;
    setAttachedFile(files);
  };

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

  async function requestGetDetail(postId, method) {
    return axios({
      url: `/${postBoard}/${postId}/${method}`,
      method: "get",
    })
      .then((res) => {
        setTitle(res.data.responseData.result.postTitle);
        setContent(res.data.responseData.result.postContent);
        setKeywords(res.data.responseData.result.keywords);
        setAttachedFile(res.data.responseData.result.attachedFile);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  useEffect(() => {
    requestGetDetail(postId, "put");
  }, [params]);

  async function requestPut() {
    const token = sessionStorage.getItem("accessToken");
    const keywordarr = [...new Set(keywords)];
    console.log(keywordarr);
    frm.append('postId', JSON.stringify(postId));
    frm.append('postTitle', JSON.stringify(title));
    frm.append('postContent', JSON.stringify(content));
    frm.append('keywords', JSON.stringify(keywordarr));

    Array.from(attachedFile).forEach(file => {
      frm.append('attachedFile', file);
    });

    return await axios({
      url: `/api/${postBoard}/manage`,
      method: "put",
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
      data: frm,
    }).then((res) => {
      console.log(res.data.responseData);
      return res.data.responseData.redirect;
    }).then((res) => {
      window.location = `${res}`;
    }).catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        const notification = new Notification("세모반 알림", {
          icon: 'http://localhost:3500/semobanlogo_3.png',
          body: `${err.response.data.message}`
        })
        setTimeout(notification.close.bind(notification), 3000);
      }
    });
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center mt-5">게시글 수정</h2>

          <form>
            <div className="form-group">
              <label for="title">
                제목 <span className="require"></span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                defaultValue={title}
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
                name="content"
                defaultValue={content}
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
                defaultValue={attachedFile}
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
                defaultValue={keywords}
                onChange={onKeywordHandler}
              ></input> */}
            </div>
            <div class="form-group mt-5 ">
              <button type="button" className="btn btn-success" onClick={requestPut}>
                수정
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;