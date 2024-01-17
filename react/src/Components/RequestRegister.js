import React, {Component} from 'react';
import'../css/member.css';
import Error from './ErrorMessage';
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';


function RequestRegister () {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pw_check, setPwCheck ] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth]= useState("");
    const [email, setEmail] = useState("");
    const [keyword, setKeyword] = useState("");
    const [isEqual, setIsEqual] = useState(true);

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

    const onKeywordHandler = (event) => {
        setKeyword(event.currentTarget.value);
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
                interestKeywords: keyword
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
            }
        });
    }

    return(
        <div className='input_page'>
            <h2>회원가입</h2>
            <div className='input'>
                <div className='input_content'>
                    <div className='input_what'><label for="id" className='form-label'>아이디</label></div>
                    <span className='input_area'><input type="text" id="id" className='write form-control' onChange={onIdHandler}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="pw" className='form-label'>비밀번호</label></div>
                    <span className='input_area'><input type="password" id="pw" className='write form-control' onChange={onPwHandler} value={pw}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="pw_check" className='form-label'>비밀번호 확인</label></div>  
                    <span className='input_area'><input type="password" id="pw_check" className='write form-control' onChange={onPwCheckHandler} value={pw_check}></input></span>
                    <Error className='error_text' visibility={!isEqual}><span>비밀번호가 일치하지 않습니다.</span></Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="name" className='form-label'>이름</label></div>
                    <span className='input_area'><input type="text" id="name" className='write form-control' onChange={onNameHandler}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="birth" className='form-label'>생년월일</label></div>
                    <span className='input_area'><input id="birth" type="date" className='write form-control' onChange={onBirthHandler}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="email" className='form-label'>이메일</label></div>
                    <span className='input_area'><input type="email" id="email" className='write form-control' onChange={onEmailHandler}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="keyword" className='form-label'>관심키워드</label></div>
                    <span className='input_area'><input type="text" id="keyword" className='write form-control' onChange={onKeywordHandler}></input></span>
                </div>
                
                <input id="button" value="회원가입" class="btn btn-success" onClick={requestRegister}></input>
            </div>
        </div>
    )
}

export default RequestRegister;