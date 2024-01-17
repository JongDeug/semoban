import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function MemberDetail() {
  const params = useParams();
  const [_id, set_id] = useState(params.memberId);
  const [userId, setUserid] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [interestKeywords, setKeywords] = useState("");

  function requestGetDetail(_id) {
    const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/api/adminMember/manage/${_id}`, // 멤버id(pk)로 findOne 해서 멤버하나 가져오는 get 컨트롤러
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserid(res.data.responseData.result.userId);
        setUserName(res.data.responseData.result.userName);
        setDateofBirth(res.data.responseData.result.dateOfBirth);
        setEmail(res.data.responseData.result.email);
        setKeywords(res.data.responseData.result.interestKeywords);
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

  function requestMemberDelete() {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: `/api/adminMember/manage/${_id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.responseData.result);
        console.log(res.data.responseData);
        return res.data.responseData.redirect;
      }).then((res) => {
        window.location = `${res}`;
      })
      .catch((err) => {
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
  }

  useEffect(() => {
    requestGetDetail(_id);
  }, []);

  return (
      <div className="updateMember">
        <Form>
          <h3 className="updateMemberTitle mb-4">사용자 정보 조회</h3>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label> 사용자 아이디</Form.Label>
            <Form.Control type="id" id="userId" defaultValue={userId} disabled />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>사용자 이름</Form.Label>
            <Form.Control
              type="name"
              id="userName"
              defaultValue={userName}
              disabled
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>사용자 생년월일</Form.Label>
            <Form.Control
              type="date"
              id="dateOfBirth"
              defaultValue={dateOfBirth}
              disabled
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>사용자 이메일</Form.Label>
            <Form.Control type="email" defaultValue={email} disabled />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>사용자 관심키워드</Form.Label>
            <Form.Control type="text" defaultValue={interestKeywords} disabled />
          </Form.Group>
  
          <p className="updateMemberButtons mt-5">
            <Button className="btn-danger" onClick={requestMemberDelete}>
              사용자 추방
            </Button>
          </p>
        </Form>
      </div>
    // <div class="container mt-5">
    //   사용자 아이디 : {userId}
    //   <br></br>
    //   사용자 이름 : {userName}
    //   <br></br>
    //   사용자 생년월일 : {dateOfBirth}
    //   <br></br>
    //   사용자 이메일 : {email}
    //   <br></br>
    //   사용자 관심 키워드 : {interestKeywords}
    //   <br></br>
    //   <div className="row ri">
    //     <button onClick={requestMemberDelete}>사용자 추방</button>
    //   </div>
    // </div>
  );
}

export default MemberDetail;
