import React, { useEffect, useState } from "react";
import axios from "axios";
// import Table from "react-bootstrap/Table";
// // import BodyContents from "./ArticleNewsBody";
// import Pagination from "../Components/Board/Pagination";
import "../css/updateMember.css";
import { Button, Form, InputGroup } from "react-bootstrap";
// import { Link } from "react-router-dom";

//async 삭제
function VariableControl() {
  const [likeVar, setLikeVar] = useState(); //  인기 게시글 충족 변수
  const [likePage, setLikePage] = useState(); //  인기 게시글 출력 수
  const [keywordVar, setKeywordVar] = useState(); //  추천 게시글 변수
  const [newsVar, setNewsVar] = useState(); //  뉴스 변수
  const [page, setPage] = useState(1);

  function requestVariable() {
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/api/adminAdjust/adjust", //  현재 저장된 변수 find()로 다 가져오는 get 컨트롤러
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLikeVar(res.data.responseData.result.likeVar);
        setLikePage(res.data.responseData.result.likePage);
        setKeywordVar(res.data.responseData.result.keywordVar);
        setNewsVar(res.data.responseData.result.newsVar);
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

  function requestChangeVariable() {
    const token = sessionStorage.getItem("accessToken");

    axios({
      url: "/api/adminAdjust/adjust", //    변수 3개 컨트롤러에 넘기면 3개다 전부 업데이트 하는 컨트롤러
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        // which: "changeInfo", //  이게뭐지
        likeVar: likeVar,
        likePage: likePage,
        keywordVar: keywordVar,
        newsVar: newsVar,
      },
    })
      .then((res) => {
        return res.data.responseData.redirect;
      })
      .then((res) => {
        window.location = `${res}`;
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
    requestVariable();
  }, []);

  const onLikeVarHandler = (event) => {
    setLikeVar(event.currentTarget.value);
  };
  const onLikePageHandler = (event) => {
    setLikePage(event.currentTarget.value);
  };
  const onKeywordVarHandler = (event) => {
    setKeywordVar(event.currentTarget.value);
  };
  const onNewsVarHandler = (event) => {
    setNewsVar(event.currentTarget.value);
  };

  return (
    <div className="updateMember">
      <Form>
        <h3 className="updateMemberTitle mb-4">시스템 변수 조정</h3>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>인기 게시글 충족 기준 &#40;좋아요 수&#41;</Form.Label>
          <Form.Control
            type="keywords"
            id="inserestKeywords"
            defaultValue={likeVar}
            onChange={onLikeVarHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>인기 게시글 출력 수</Form.Label>
          <Form.Control
            type="keywords"
            id="inserestKeywords"
            defaultValue={likePage}
            onChange={onLikePageHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>추천 게시글 출력 수</Form.Label>
          <Form.Control
            type="keywords"
            id="inserestKeywords"
            defaultValue={keywordVar}
            onChange={onKeywordVarHandler}
          />
        </Form.Group>

        <p className="updateMemberButtons">
          <Button
            className="btn-success"
            // type="submit"
            onClick={requestChangeVariable}
          >
            변수 수정
          </Button>
        </p>
      </Form>
    </div>
  );
}

export default VariableControl;
