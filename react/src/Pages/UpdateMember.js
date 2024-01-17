import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Error from "../Components/ErrorMessage";
import "../css/updateMember.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState,useRef } from "react";
import CreatableSelect from "react-select/creatable";

function UpdateMember() {
  const [userId, setUserid] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const token = sessionStorage.getItem("accessToken");
  const [keywords, setKeywords] = useState([]);
  const keys = useRef([]);
  const keysafter = useRef([]);

  const [isValidEmail, setIsValidEmail] = useState(false);

  const majorSpeciesOptions = [
    { value: "강아지", label: "강아지" },
    { value: "고양이", label: "고양이" },
  ];

  const minorSpeciesOptions = [
      { value: "토끼", label: "토끼" },
      { value: "햄스터", label: "햄스터" },
  ];

  const groupedOptions = [
    {
        label: "동물",
        options: majorSpeciesOptions,
    },
    {
        label: "동물2",
        options: minorSpeciesOptions,
    },
  ];

  function SetKeywords(event){
    console.log(event);
    // if(event[event.length-1].value.charAt(0)==='#'){
    //     event[event.length-1].label = event[event.length-1].label.slice(1);
    //     event[event.length-1].value = event[event.length-1].value.slice(1);
    // }
    if(event!==[]){
      // keys.current.push(event[event.length-1].value);

    }
    setKeywords(event);
    console.log(keywords);
    console.log(keywords[0]);
    console.log(typeof keywords[0]);
}

  const onEmailValidCheck = (event) => {
    const checkEmail = event.currentTarget.value;
    if (checkEmail === "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  //DB받아오기
  useEffect(() => {
    async function getInfo() {
      await axios({
        url: "/api/member/changeInfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
          setUserid(res.data.responseData.result.userId);
          setDateofBirth(res.data.responseData.result.dateOfBirth);
          setEmail(res.data.responseData.result.email);
          console.log(res.data.responseData.result.interestKeywords);
          res.data.responseData.result.interestKeywords&&res.data.responseData.result.interestKeywords.map((key)=>{
            keys.current.push({value:`${key}`,label:`${key}`});
          })
          console.log(keys.current);
          setKeywords(keys.current);
      })
      .catch(function (err) {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
          }
      });
    }

    getInfo();
  },[]);

  //데이터 전송
  function requestChangeInfo() {
    const token = sessionStorage.getItem("accessToken");
    keywords.map((keyword)=>{
      keysafter.current.push(keyword.value);
      console.log(keyword.value);
    })
    console.log(keywords.current);
    axios({
      url: "/api/member/changeInfo",
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        // "which": "changeInfo",
        "dateOfBirth": dateOfBirth,
        "email": email,
        "interestKeywords": keysafter.current,
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
          console.log(keysafter.current);
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

  const onIdHandler = (event) => {
    setUserid(event.currentTarget.value);
  };
  const onBirthHandler = (event) => {
    setDateofBirth(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
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
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>생년월일</Form.Label>
          <Form.Control
            type="date"
            id="dateOfBirth"
            defaultValue={dateOfBirth}
            onChange={onBirthHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            defaultValue={email}
            onChange={onEmailHandler}
            onBlur={onEmailValidCheck}
          />
          <Error className="error_text" visibility={isValidEmail}>
            <span>이메일을 입력해주세요.</span>
          </Error>
        </Form.Group>

        <div className='input_content'>
          <div className='input_what'>
            <label for="keyword" className='form-label'>
              관심키워드
            </label>
          </div>
          <CreatableSelect
            isMulti
            defaultValue={keys.current}
            options={groupedOptions}
            placeholder="키워드 입력"
            formatCreateLabel={(inputText) => `"${inputText}" 추가`}
            onChange={SetKeywords}
          />
        </div>

        <p className="updateMemberButtons">
          <Button
            className="btn-success"
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
