import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ArticleNewsDetail() {
  const params = useParams();
  const [_id, set_id] = useState(params.newsId);
  const [newsId, setNewsId] = useState(); //  이건임시로
  const [newsTitle, setNewsTitle] = useState(); //  뉴스 제목
  const [newsDescription, setNewsDescription] = useState(); //  뉴스 요약문
  const [newsContent, setNewsContent] = useState(); //  뉴스 기사 내용
  const [newsImageURL, setNewsImageURL] = useState([]); //  내용에 포함된 이미지 (url 형태) 이건 아직 조정중
  const [newsPubDate, setNewsPubDate] = useState(); // 뉴스 발행일
  const [newsSourceLink, setNewsSourceLink] = useState(); // 뉴스 원문 링크 (네이버뉴스X 소스링크)

  function requestGetDetail(_id) {
    const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/news/article/${_id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setNewsTitle(res.data.responseData.result.newsTitle);
        setNewsDescription(res.data.responseData.result.newsDescription);
        setNewsContent(res.data.responseData.result.newsContent);
        setNewsImageURL(res.data.responseData.result.newsImageURL);
        setNewsPubDate(res.data.responseData.result.newsPubDate);
        setNewsSourceLink(res.data.responseData.result.newsSourceLink);
        console.log(res.data.responseData.result);
        hi();
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
    requestGetDetail(_id);
  }, []);

  function PrintImage() {
    const arr = [];
    newsImageURL &&
      newsImageURL.map((img) => {
        arr.push(
          <div className="newsimg">
            <img src={`${img}`}></img>
            <br></br>
          </div>
        );
      });
    return arr;
  }
  
  function hi() {
    const date = new Date({ newsPubDate });

    const d = date.getDate;
    console.log(d);
  }

  return (
    <>
      <div class="container mt-5">
        <div className="row ri">
          <Form.Group className="group">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-3">{newsTitle}</h1>
                <div className="text-muted fst-italic mb-2">
                  발행날짜 : {newsPubDate}
                </div>
                <div className="text-muted mb-2">
                  원문링크 : {newsSourceLink}
                </div>
              </header>

              <PrintImage></PrintImage>
              <section className="mb-5">
                <p className="fs-5 mb-4">{newsContent}</p>
              </section>
              {/* <img src={newsImageURL[0]}></img> */}
            </article>
          </Form.Group>

          <div />
        </div>
      </div>
    </>
  );
}

export default ArticleNewsDetail;
