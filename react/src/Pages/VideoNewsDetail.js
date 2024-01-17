import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function VideoNewsDetail() {
  const params = useParams();
  const [_id, set_id] = useState(params.videoNewsId); //  테이블id
  const [videoId, setVideoNewsId] = useState(); //  영상 출력용 고유 유튜브id (밑에 아이프레임에 필요)
  const [videoNewsTitle, setVideoNewsTitle] = useState(); //  유튜브 제목
  const [newsDescription, setVideoNewsDescription] = useState(); //  유튜브 영상 소개글 (요약문)
  const [thumbnailURL, setThumbnailURL] = useState(); //  썸네일 이미지 (주소 형식)

  function requestGetDetail(_id) {
    // const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/news/video/${_id}`,
      method: "get",
      // headers: {
        // Authorization: `Bearer ${token}`,
      // },
    })
      .then((res) => {
        setVideoNewsId(res.data.responseData.result.videoId);
        setVideoNewsTitle(res.data.responseData.result.newsTitle);
        setVideoNewsDescription(res.data.responseData.result.newsDescription);
        setThumbnailURL(res.data.responseData.result.thumbnailURL);
        console.log(res.data.responseData.result);
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

  const source = "https://www.youtube.com/embed/" + videoId; //  유튜브 영상 url

  return (
    <>
      <div class="container mt-5">
        <div className="row ri">
          <Form.Group className="group">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-3">{videoNewsTitle}</h1>
                {/* <div className="text-muted fst-italic mb-2">
                  발행날짜 : {newsPubDate}
                </div>
                <div className="text-muted mb-2">
                  원문링크 : {newsSourceLink}
                </div> */}
              </header>

              <iframe
                id="ytplayer"
                type="text/html"
                width="720"
                height="600"
                src={source}
                frameborder="0"
                allowfullscreen
              ></iframe>
              {/* <section className="mb-5">
                <p className="fs-5 mb-4">{newsDescription}</p>
              </section> */}
            </article>
          </Form.Group>

          <div />
        </div>
      </div>
    </>
    
    // <div class="container mt-5">
    //   {videoNewsTitle}
    //   <div className="row ri">
    //     {/* iframe이 동영상 출력하는부분 src에 videoId 넣으면 영상 연결됨 */}
    //     <iframe
    //       id="ytplayer"
    //       type="text/html"
    //       width="720"
    //       height="600"
    //       src={source}
    //       frameborder="0"
    //       allowfullscreen
    //     ></iframe>
    //     {newsDescription}
    //     {/* 이건 그냥 뺄까? */}
    //   </div>
    // </div>
  );
}

export default VideoNewsDetail;
