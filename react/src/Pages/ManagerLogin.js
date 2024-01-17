import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { result } from "lodash";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //id에 입력한 id 저장
  function onIdHandler(event) {
    setId(event.currentTarget.value);
  }
  //password에 입력한 비밀번호 저장
  function onPasswordHandler(event) {
    setPassword(event.currentTarget.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function LoginEnter(event) {
    if (event.key === "Enter") {
      Login();
    }
  }

  function Login() {
    requestAdminLogin();
  }

  function requestAdminLogin() {
    axios({
      url: "/adminAuth/login",
      method: "post",
      data: {
        userId: id,
        password: password,
      },
    })
      .then((res) => {
        const accessToken = res.data.responseData.result.accessToken;
        const host = res.data.responseData.result.host;
        const role = res.data.responseData.result.roles;
        // sessionStorage.setItem("host", host);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("roles", role);
        sessionStorage.setItem("state", "manager");
        console.log(res.data.responseData.result);
        return res.data.responseData.redirect;
      })
      .then((res) => {
        window.location = `${res}`; //  컨트롤러에서 리다이렉트 없으면 이거 삭제
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
  
  useEffect(()=>{
    if (sessionStorage.getItem("accessToken")) {
      alert("이미 로그인 되어 있습니다.");
      window.location.href = `/`;
      } 
  },[]);

  return (
    <div className="Login">
      <Form className="p-4">
        <h3 className="loginTitle">관리자 로그인</h3>
        <Form.Group size="lg" controlId="id" className="mb-4">
          <Form.Label className="mb-2">아이디</Form.Label>
          <Form.Control autoFocus type="id" value={id} onChange={onIdHandler} />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="mb-5">
          <Form.Label className="mb-2">비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={onPasswordHandler}
            onKeyPress={LoginEnter}
          />
        </Form.Group>

        <Button
          block="true"
          className="mb-5 btn btn-success loginBtn"
          size="lg"
          onClick={requestAdminLogin}
        >
          로그인
        </Button>
      </Form>
    </div>
  );
}
