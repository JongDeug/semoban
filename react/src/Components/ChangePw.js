import axios from 'axios';
import React, { Component, useEffect, useState, useCallback } from 'react';
import '../css/member.css';


function ChangePwPage () {
    const [oldPw, setOldPw] = useState();
    const [newPw, setNewPw] = useState();

    const onOldPwHandler = (event) => {
        setOldPw(event.currentTarget.value);
    }
    
    const onNewPwHandler = (event) => {
        setNewPw(event.currentTarget.value);
    }

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
        .catch((err) => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        });
    }


    return (
        <div className='input_page'>
            <h2>비밀번호 변경</h2>
            <div className='input'>
                <div className='input_content'>
                    <div className='input_what'><label for="name" className='form-label'>기존 비밀번호</label></div>
                    <span className='input_area'><input type="password" id="oldPw" className='write form-control' onChange={onOldPwHandler}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="email" className='form-label'>새 비밀번호</label></div>
                    <span className='input_area'><input type="password" id="newPw" className='write form-control' onChange={onNewPwHandler}></input></span>
                </div>
                    
                <input id="button" value="비밀번호 변경" class="btn btn-success" onClick={requestChangePw}></input>
            </div>
        </div>
    )

}

export default ChangePwPage;