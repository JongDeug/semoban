import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [newsId, setNewsId] = useState(props.news._id); //  DB 테이블 id
  const [newsTitle, setNewsTitle] = useState(props.news.newsTitle); //  뉴스 제목
  const [newsDescription, setNewsDescription] = useState(
    //  뉴스 요약문
    props.news.newsDescription
  );
  const [newsNaverLink, setNewsNaverLink] = useState(props.news.newsNaverLink); // 네이버 뉴스 링크
  const [newsPubDate, setNewsPubDate] = useState(props.news.newsPubDate); // 뉴스 발행일
  const [newsImageURL, setNewsImageURL] = useState(props.news.newsImageURL); //  내용에 포함된 이미지 (url 형태)
  const [newsSourceLink, setNewsSourceLink] = useState(
    props.news.newsSourceLink
  ); // 뉴스 원문 링크 (네이버뉴스X 소스링크)
  const [ispcsize, setIspcsize] = useState(true);

  function move() {
    window.location.href = newsNaverLink;
  }
  function changeContent(){
    var tabWidth = window.matchMedia("screen and (min-width:480px)");
    var pcWidth = window.matchMedia("screen and (min-width:800px)");
    if(pcWidth.matches){
        setIspcsize(true);
    }
    
    else{
        setIspcsize(false);
    }
  }
  useEffect(()=>{
      changeContent();
  },[]);
  
  return (
    <>
      {ispcsize?
      <tr className='cursoron' onClick={() => window.open(newsNaverLink)}>
        <th className="content news_thumbnail">
          {/* <Link
            to={{ pathname: `/articleNews/${newsId}`, state: newsId }}
            className="post_link"
          >
            <img src={newsImageURL[0]}></img>
          </Link> */}
          <div class="url" onClick={() => window.open(newsNaverLink)}>
            <img src={newsImageURL[0]}></img>
          </div>
        </th>
        <th className="content news_title">
          <div class="url" onClick={() => window.open(newsNaverLink)}>
            {newsTitle}
          </div>
        </th>
        <th className="content news_description">
          <div class="url" onClick={() => window.open(newsNaverLink)}>
            {newsDescription}
          </div>
        </th>
      </tr>
      :
      <tr className='cursoron' onClick={() => window.open(newsNaverLink)}>
        <th className="content news_thumbnail">
          {/* <Link
            to={{ pathname: `/articleNews/${newsId}`, state: newsId }}
            className="post_link"
          >
            <img src={newsImageURL[0]}></img>
          </Link> */}
          <div class="url" onClick={() => window.open(newsNaverLink)}>
            <img src={newsImageURL[0]}></img>
          </div>
        </th>
        <th className="content news_title">
          <div class="url" onClick={() => window.open(newsNaverLink)}>
            {newsTitle}
          </div>
        </th>
      </tr>
      }
    </>
  );
}

export default BodyContents;
