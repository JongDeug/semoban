import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BoardHead from "../../Components/Board/BoardHead";
import BodyContents from "../../Components/Board/BoardBody";
import Pagination from "../../Components/Board/Pagination";
import "../../css/board.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Comment from "../../Components/Post/Comment";

function MyComment() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  function requestGet() {
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/api/memberActivity/myComment",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setComments(res.data.responseData.result);
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

  useEffect(() => {
    requestGet();
    console.log(comments);
  }, []);

  function PrintComments() {
    const list = [];

    comments &&
      comments.map((comments) => {
        list.push(<Comment comment={comments} />);
      });
    return list;
  }

  return (
    <>
      <h2>내 댓글</h2>

      <main>
        {/* <InputGroup className="mb-3">
          <input placeholder="검색" className="serach_input" />
          <Button variant="outline-secondary" id="button-addon2">
            검색
          </Button>
        </InputGroup> */}
        {/* 댓글 검색기능? */}

        <div className="commentslist">
          <PrintComments></PrintComments>
        </div>
      </main>
      <Pagination
        total={comments.length}
        limit={limit}
        page={page}
        setPage={setPage}
      ></Pagination>
    </>
  );
}

export default MyComment;
