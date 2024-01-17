import React from "react";
import { useState, useEffect, useRef } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { BiX } from "react-icons/bi";
import axios from "axios";

function CommentNotice(props) {
  const [userid, setUserid] = useState(props.comment.userId);
  const [title, setTitle] = useState(props.comment.postTitle);
  const [postId, setPostId] = useState(props.comment.postId);
  const [postType, setPostType] = useState(props.comment.postType);
  const [content, setContent] = useState(props.comment.content);
  const [visible, setVisible] = useState(true);

  function requestNoticeDelete(noticeId) {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: "/api/notice",
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        noticeId: noticeId,
      },
    })
      .then((res) => {
        console.log(res.data.responseData.result);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }
  function clicktodelete(e) {
    e.preventDefault();
    setVisible(false);
    requestNoticeDelete(props.comment._id);
    props.deletelist(props.comment._id);
    console.log("x-button clicked");
  }

  return (
    <>
      {visible && (
        <div class="list-group-item">
          <div class="row g-0 align-items-center">
            <div class="col-10">
              <Link
                to={{
                  //   pathname: `/post/${postType}/${postId}`,
                  state: { postBoard: postType, postId: postId },
                }}
                onClick={() =>
                  (window.location.href = `/post/${postType}/${postId}`)
                }
                class="text-dark"
              >
                <strong>{props.comment.userId}</strong>님이 회원님의 게시글 "
                {title}"에 댓글을 작성했습니다.
              </Link>
              <div class="text-muted small mt-1">
                댓글 내용 : {props.comment.contents}
              </div>
              {/* <div class="text-muted small mt-1">30분 전</div> */}
            </div>
            <div class="col-2 deleteBtn" type="button">
              <BiX
                className="deleteIcon"
                fill="#f64d7185"
                size={24}
                onClick={clicktodelete}
              ></BiX>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentNotice;
