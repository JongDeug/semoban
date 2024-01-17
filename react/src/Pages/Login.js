import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Warning from "../Components/ModalWarning";
import Error from "../Components/ErrorMessage";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isValidId, setIsValidId] = useState(false);
  const [isValidPw, setIsValidPw] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //id에 입력한 id 저장
  function onIdHandler(event) {
    setId(event.currentTarget.value);
  }

  const onIdValidCheck = (event) => {
    const checkId = event.currentTarget.value;
    if (checkId === "") {
      setIsValidId(true);
      console.log(checkId);
    } else {
      setIsValidId(false);
      console.log(checkId);
    }
  };

  //password에 입력한 비밀번호 저장
  function onPasswordHandler(event) {
    setPassword(event.currentTarget.value);
  }
  const onPwValidCheck = (event) => {
    const checkPw = event.currentTarget.value;
    if (checkPw === "") {
      setIsValidPw(true);
    } else {
      setIsValidPw(false);
    }
  };

  function LoginEnter(event){
    if (event.key==='Enter'){
        Login();
    }
  }
  function Login(){
    requestLogin();
  }

  //로그인 요청
  function requestLogin() {
    axios({
      url: "/auth/login",
      method: "post",
      data: {
        userId: id,
        password: password,
      },
    })
      .then((res) => {
        const accessToken = res.data.responseData.result.accessToken;
        const host = res.data.responseData.result.host;
        const role = res.data.responseData.result.role;
        sessionStorage.setItem("host", host);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("role", role);
        return res.data.responseData.redirect;
      })
      .then((res) => {
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

  useEffect(()=>{
    if (sessionStorage.getItem("accessToken")) {
      alert("이미 로그인 되어 있습니다.");
      window.location.href = `/`;
      } 
  },[]);

  return (
    <div className="Login">
      <Form className="p-4">
        <h3 className="loginTitle">로그인</h3>
        <Form.Group size="lg" controlId="id" className="mb-4">
          <Form.Label className="mb-2">아이디</Form.Label>
          <Form.Control
            autoFocus
            type="id"
            id="id"
            value={id}
            onChange={onIdHandler}
            onBlur={onIdValidCheck}
          />
          <Error className="error_text" visibility={isValidId}>
            <span>아이디를 입력해주세요.</span>
          </Error>
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="mb-5">
          <Form.Label className="mb-2">비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={onPasswordHandler}
            onKeyPress={LoginEnter}
            onBlur={onPwValidCheck}
          />
          <Error className="error_text" visibility={isValidPw}>
            <span>비밀번호를 입력해주세요.</span>
          </Error>
        </Form.Group>

        <Button
          block="true"
          className="mb-5 btn btn-success loginBtn"
          size="lg"
          onClick={requestLogin}
        >
          로그인
        </Button>
        <Warning
          show={show}
          setShow={setShow}
          title={"회원정보 오류"}
          body={"아이디 또는 비밀번호가 틀립니다."}
          handleClose={handleClose}
        ></Warning>

        <div className="d-flex flex-row justify-content-around mb-4 findBtn">
          <Link to="/findid" className="findIdBtn">
            아이디 찾기
          </Link>
          <Link to="/findpassword" className="findPwdBtn">
            비밀번호 찾기
          </Link>
        </div>
      </Form>
    </div>
  );
}
