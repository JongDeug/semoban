import React, {Component, useRef} from 'react';
import'../css/member.css';
import Error from '../Components/ErrorMessage';
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import CreatableSelect from "react-select/creatable";
import { getElementsByTagName } from 'domutils';


function RequestRegister () {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pw_check, setPwCheck ] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth]= useState("");
    const [email, setEmail] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [isEqual, setIsEqual] = useState(true);
    const keys = useRef([]);
    let keyword = [];

    const [isValidId, setIsValidId] = useState(false);
    const [isValidPw, setIsValidPw] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidBirth, setIsValidBirth] = useState(false);
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
    
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
        console.log({id});
    };

    const onPwHandler = (event) => {
        const pw = document.querySelector('#pw').value;
        const pw_check = document.querySelector('#pw_check').value;
        setPw(event.currentTarget.value);
        if(pw===pw_check){
            setIsEqual(true);
            console.log(pw);
            console.log(pw_check);
        }
        else {
            setIsEqual(false);
            console.log(pw);
            console.log(pw_check);
        }
    };

    const onPwCheckHandler = (event) => {
        const pw = document.querySelector('#pw').value;
        const pw_check = document.querySelector('#pw_check').value;
        setPwCheck(event.currentTarget.value);
        if(pw===pw_check){
            setIsEqual(true);
            console.log(pw);
            console.log(pw_check);
        }
        else {
            setIsEqual(false);
            console.log(pw);
            console.log(pw_check);
        }
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onBirthHandler = (event) => {
        setBirth(event.currentTarget.value);
    };

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    // const onKeywordHandler = (event) => {
    //     setKeywords(event.currentTarget.value);
    // };

    function SetKeywords(event){
        // console.log("event:"+event.key);
        if(event[event.length-1].value.charAt(0)==='#'){
            event[event.length-1].label = event[event.length-1].label.slice(1);
            event[event.length-1].value = event[event.length-1].value.slice(1);
        }
        keyword.push(event[event.length-1].value);
        keys.current.push(event[event.length-1].value);
        setKeywords(event);
    }

    const onIdValidCheck = (event) => {
        const checkId = event.currentTarget.value;
        if (checkId === "") {
        setIsValidId(true);
        } else {
        setIsValidId(false);
        }
    };

    const onPwValidCheck = (event) => {
        const checkPw = event.currentTarget.value;
        if (checkPw === "") {
        setIsValidPw(true);
        } else {
        setIsValidPw(false);
        }
    };

    const onNameValidCheck = (event) => {
        const checkName = event.currentTarget.value;
        if (checkName === "") {
        setIsValidName(true);
        } else {
        setIsValidName(false);
        }
    };

    const onBirthValidCheck = (event) => {
        const checkBirth = event.currentTarget.value;
        if (checkBirth === "") {
        setIsValidBirth(true);
        } else {
        setIsValidBirth(false);
        }
    };

    const onEmailValidCheck = (event) => {
        const checkEmail = event.currentTarget.value;
        if (checkEmail === "") {
        setIsValidEmail(true);
        } else {
        setIsValidEmail(false);
        }
    };

    const requestRegister = () => {
        const email = document.getElementById("email");

        axios({
            method:"POST",
            url: "/auth/register",
            data:{
                userId: id,
                password: pw,
                userName: name,
                dateOfBirth: birth,
                email: email.value,
                interestKeywords: keys.current
            }
        })
        .then(res=>{
            return res.data.responseData.redirect;
        })
        .then((res)=>{
            window.location = `${res}`;
        })
        .catch(function (err) {
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

    return(
        <div className='input_page'>
            <h2>회원가입</h2>
            <div className='input'>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="id" className='form-label'>아이디</label>
                    </div>
                    <span className='input_area'>
                        <input type="text" id="id" className='write form-control' onChange={onIdHandler} onBlur={onIdValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidId}>
                        <span>아이디를 입력해주세요.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="pw" className='form-label'>비밀번호</label>
                    </div>
                    <span className='input_area'>
                        <input type="password" id="pw" className='write form-control' onChange={onPwHandler} onBlur={onPwValidCheck} value={pw}></input>
                    </span>
                    <Error className="error_text" visibility={isValidPw}>
                        <span>비밀번호를 입력해주세요.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="pw_check" className='form-label'>비밀번호 확인</label>
                    </div>  
                    <span className='input_area'>
                        <input type="password" id="pw_check" className='write form-control' onChange={onPwCheckHandler} value={pw_check}></input>
                    </span>
                    <Error className="error_text" visibility={!isEqual}>
                        <span>비밀번호가 일치하지 않습니다.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="name" className='form-label'>이름</label>
                    </div>
                    <span className='input_area'>
                        <input type="text" id="name" className='write form-control' onChange={onNameHandler} onBlur={onNameValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidName}>
                        <span>이름을 입력해주세요.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="birth" className='form-label'>생년월일</label>
                    </div>
                    <span className='input_area'>
                        <input id="birth" type="date" className='write form-control' onChange={onBirthHandler} onBlur={onBirthValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidBirth}>
                        <span>생년월일을 입력해주세요.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="email" className='form-label'>이메일</label>
                    </div>
                    <span className='input_area'>
                        <input type="email" id="email" className='write form-control' onChange={onEmailHandler} onBlur={onEmailValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidEmail}>
                        <span>이메일을 입력해주세요.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="keyword" className='form-label'>
                            관심키워드
                        </label>
                    </div>
                    <CreatableSelect
                        isMulti
                        // suggestions={suggestions}
                        options={groupedOptions}
                        placeholder="키워드 입력"
                        formatCreateLabel={(inputText) => `"${inputText}" 추가`}
                        onChange={SetKeywords}
                    />
                </div>
                <input type='button' id="button" value="회원가입" class="btn btn-success" onClick={requestRegister}></input>
            </div>
        </div>
    )
}

export default RequestRegister;