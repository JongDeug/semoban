import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/updateMember.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function UpdateMember() {
  const [userId, setUserid] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [interestKeywords, setKeywords] = useState("");
  const token = sessionStorage.getItem("accessToken");

  //DB받아오기
  useEffect(() => {
    async function getInfo() {
      // let input_userId = document.querySelector('#id');
      // let input_dateOfBirth = document.querySelector('#dateOfBirth');
      // let input_email = document.querySelector('#email');
      // let input_interestKeywords = document.querySelector('#interestKeywords');

      await axios({
        url: "/api/member/changeInfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          // input_userId.value = res.data.responseData.userId;
          // input_dateOfBirth.value = res.data.responseData.dateOfBirth;
          // input_email.value = res.data.responseData.email;
          // input_interestKeywords.value = res.data.responseData.interestKeywords;
          setUserid(res.data.responseData.result.userId);
          setDateofBirth(res.data.responseData.result.dateOfBirth);
          setEmail(res.data.responseData.result.email);
          setKeywords(res.data.responseData.result.interestKeywords);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }

    getInfo();
  }, []);

  //데이터 전송
  function requestChangeInfo() {
    const token = sessionStorage.getItem("accessToken");
    // const dateOfBirth = document.querySelector('#dateOfBirth').value;
    // const email = document.querySelector('#email').value;
    // const interestKeywords = document.querySelector('#interestKeywords').value;
    axios({
      url: "/api/member/changeInfo",
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        "which": "changeInfo",
        "dateOfBirth": dateOfBirth,
        "email": email,
        "interestKeywords": interestKeywords,
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

  const onIdHandler = (event) => {
    setUserid(event.currentTarget.value);
  };
  const onBirthHandler = (event) => {
    setDateofBirth(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onKeywordHandler = (event) => {
    setKeywords(event.currentTarget.value);
  };

  return (
    <div className="updateMember">
      <Form>
        <h3 className="updateMemberTitle mb-4">회원정보 수정</h3>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="id"
            id="userId"
            defaultValue={userId}
            onChange={onIdHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>생년월일</Form.Label>
          <Form.Control
            type="date"
            id="dateOfBirth"
            defaultValue={dateOfBirth}
            onChange={onBirthHandler}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            defaultValue={email}
            onChange={onEmailHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>키워드</Form.Label>
          <Form.Control
            type="keywords"
            id="inserestKeywords"
            defaultValue={interestKeywords}
            onChange={onKeywordHandler}
          />
        </Form.Group>

        <p className="updateMemberButtons">
          <Button
            className="btn-success"
            // type="submit"
            onClick={requestChangeInfo}
          >
            수정
          </Button>
          <Button className="btn-success" type="submit">
            <Link to="/changepassword" className="link_button">
              비밀번호 수정
            </Link>
          </Button>
          <Button className="btn-success" type="submit">
            <Link to="/leaveid" className="link_button">
              회원탈퇴
            </Link>
          </Button>
        </p>
      </Form>
    </div>
  );
}

export default UpdateMember;
