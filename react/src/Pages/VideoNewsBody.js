import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [videoNewsId, setVideoNewsId] = useState(props.videoNews._id); //  db 테이블 id
  const [videoId, setVideoId] = useState(
    //  유튜브 제목
    props.videoNews.videoId
  );
  const [videoNewsTitle, setVideoNewsTitle] = useState(
    //  유튜브 제목
    props.videoNews.newsTitle
  );
  const [videoNewsDescription, setVideoNewsDescription] = useState(
    //  유튜브 영상 소개글 (요약문)
    props.videoNews.newsDescription
  );
  const [thumbnailURL, setThumbnailURL] = useState(
    //  썸네일 이미지 (주소 형식)
    props.videoNews.thumbnailURL
  );
  const [ispcsize, setIspcsize] = useState(true);
  
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

  const srcLink = "https://www.youtube.com/watch?v=" + videoId;
  return (
    <>
    {ispcsize?
      <tr className="cursoron" onClick={() => window.open(srcLink)}>
      <th className="content news_thumbnail">
        <div class="url" onClick={() => window.open(srcLink)}>
          <img src={thumbnailURL}></img>
        </div>
      </th>
      <th className="content news_title">
        <div class="url" onClick={() => window.open(srcLink)}>
          {videoNewsTitle}
        </div>
      </th>
      <th className="news_description">
        <div class="url" onClick={() => window.open(srcLink)}>
          {videoNewsDescription}
        </div>
      </th>
      </tr>
      :
      <tr className="cursoron" onClick={() => window.open(srcLink)}>
        <th className="content news_thumbnail">
          <div class="url" onClick={() => window.open(srcLink)}>
            <img src={thumbnailURL}></img>
          </div>
        </th>
        <th className="content news_title">
          <div class="url" onClick={() => window.open(srcLink)}>
            {videoNewsTitle}
          </div>
        </th>
      </tr>
    }
    </>
  );
}

export default BodyContents;
