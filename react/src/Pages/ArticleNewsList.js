import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BodyContents from "./ArticleNewsBody";
import Pagination from "../Components/Board/Pagination";
import NewsBoardHead from "../Components/News/NewsBoardHead";
import "../css/board.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function ArticleNewsList() {
  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [isLogin, setIsLogin] = useState(true);

  function setLoginState() {
    if (sessionStorage.getItem("accessToken")) {
    setIsLogin(true);
    } else {
    setIsLogin(false);
    }
}

  function requestGet() {
    return axios({
      url: "/news/article",
      method: "get",
    })
      .then((res) => {
        setNews([...res.data.responseData.result].reverse());
        console.log(res.data.responseData.result);
        console.log(res.data.responseData.result.reverse());
        console.log(news);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }
  function requestGetWithKeyword() {
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/api/news/articleKeyword",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setNews(res.data.responseData.result);
        console.log(res.data.responseData.result);
        console.log(news);
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
    setLoginState();
    // console.log(news);
  }, []);

  function ShowContents() {
    const list = [];
    news.slice(offset, offset + limit).map((news) => {
      list.push(<BodyContents news={news}></BodyContents>);
    });
    return list;
  }

  return (
    <>
      <h2>기사 뉴스 목록</h2>
      <div className="to_flex">
        <main>
          <div className="article-btn-wrap news_btns">
            {isLogin?
              <Button className="btn-success news_btn" onClick={requestGetWithKeyword}>
                내 키워드 적용
              </Button>
              :  
              <></>
            }
            
            <Button className="btn-success news_btn" onClick={requestGet}>
              전체 기사 조회
            </Button>
          </div>
          <Table striped bordered hover>
            <div className=""></div>
            <NewsBoardHead></NewsBoardHead>
            <tbody>
              <ShowContents></ShowContents>
            </tbody>
          </Table>

          <Pagination
            total={news.length}
            limit={limit}
            page={page}
            setPage={setPage}
          ></Pagination>
        </main>
      </div>
    </>
  );
}

export default ArticleNewsList;
