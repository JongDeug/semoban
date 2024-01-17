import axios from 'axios';
import React, { Component, useEffect, useState, useCallback } from 'react';
import '../css/member.css';



function FindIdPage () {
    
    const [userName, setUserName] = useState();
    const [userBirth, setUserBirth] = useState();
    const [userEmail, setUserEmail] = useState();

    const onNameHandler = (event) =>{
        setUserName(event.currentTarget.value);
    }

    const onBirthHandler = (event) =>{
        setUserBirth(event.currentTarget.value);
    }

    const onEmailHandler = (event) =>{
        setUserEmail(event.currentTarget.value);
    }


    const requestFindid = (event) => {
        axios({
            method:"POST",
            url: "/auth/findId",
            data:{
                "userName": userName,
                "dateOfBirth": userBirth,
                "email": userEmail
            }
        })
        .then(function (res){
            console.log(res.data.responseData);
        })
        .catch(console.err);
    }

    return(
        <div className='input_page'>
            <h2>아이디 찾기</h2>
            <div className='input'>
                <div className='input_content mb-3'>
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
                    
                <input id="button" value="아이디 찾기" class="btn btn-success" onClick={requestFindid}></input>
            </div>
        </div>
    )
}

export default FindIdPage;