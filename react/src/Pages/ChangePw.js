import axios from 'axios';
import React, { Component, useEffect, useState, useCallback } from 'react';
import '../css/member.css';
import Error from "../Components/ErrorMessage";


function ChangePwPage () {
    const [oldPw, setOldPw] = useState();
    const [newPw, setNewPw] = useState();

    const onOldPwHandler = (event) => {
        setOldPw(event.currentTarget.value);
    }
    
    const onNewPwHandler = (event) => {
        setNewPw(event.currentTarget.value);
    }

    const [isValidOldPw, setIsValidOldPw] = useState(false);
    const [isValidNewPw, setIsValidNewPw] = useState(false);
  
    const onOldPwValidCheck = (event) => {
        const checkOldPw = event.currentTarget.value;
        if (checkOldPw === "") {
            setIsValidOldPw(true);
        } else {
            setIsValidOldPw(false);
        }
    };
  
    const onNewPwValidCheck = (event) => {
      const checkNewPw = event.currentTarget.value;
      if (checkNewPw === "") {
        setIsValidNewPw(true);
      } else {
        setIsValidNewPw(false);
      }
    };

    const requestChangePw = (event) => {
        const token = sessionStorage.getItem('accessToken');
        axios({
            method:"put",
            url: "/api/member/changePwd",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data:{
                "password_exist": oldPw,
                "password_change": newPw 
            }
        })
        .then(function (res){
            return res.data.responseData.redirect;
        }).then((res) => {
            window.location = `${res}`;
            console.log(res);
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


    return (
        <div className='input_page'>
            <h2>비밀번호 변경</h2>
            <div className='input'>
                <div className='input_content'>
                    <div className='input_what'><label for="name" className='form-label'>기존 비밀번호</label></div>
                    <span className='input_area'><input type="password" id="oldPw" className='write form-control' onChange={onOldPwHandler} onBlur={onOldPwValidCheck}></input></span>
                    <Error className="error_text" visibility={isValidOldPw}>
                        <span>비밀번호를 입력해주세요.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="email" className='form-label'>새 비밀번호</label></div>
                    <span className='input_area'><input type="password" id="newPw" className='write form-control' onChange={onNewPwHandler} onBlur={onNewPwValidCheck}></input></span>
                    <Error className="error_text" visibility={isValidNewPw}>
                        <span>새 비밀번호를 입력해주세요.</span>
                    </Error>
                </div>
                    
                <input id="button" type='button' value="비밀번호 변경" class="btn btn-success" onClick={requestChangePw}></input>
            </div>
        </div>
    )

}

export default ChangePwPage;