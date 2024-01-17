import axios from 'axios';
import React, { Component, useEffect, useState, useCallback } from 'react';
import '../css/member.css';
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Error from "../Components/ErrorMessage";



function FindPwPage() {

    const [userId, setUserId] = useState();
    const [userEmail, setUserEmail] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isValidId, setIsValidId] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const onIdHandler = (event) => {
        setUserId(event.currentTarget.value);
    }

    const onEmailHandler = (event) => {
        setUserEmail(event.currentTarget.value);
    }

    const onIdValidCheck = (event) => {
        const checkId = event.currentTarget.value;
        if (checkId === "") {
            setIsValidId(true);
        } else {
            setIsValidId(false);
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
    
    const requestFindPw = (event) => {
        axios({
            method: "POST",
            url: "/auth/findPwd",
            data: {
                "userId": userId,
                "email": userEmail
            }
        })
            .then((res) => {
                console.log(res.data.responseData);
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
            <h2>비밀번호 찾기</h2>
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
                        <label for="email" className='form-label'>이메일</label>
                    </div>
                    <span className='input_area'>
                        <input type="email" id="email" className='write form-control' onChange={onEmailHandler} onBlur={onEmailValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidEmail}>
                        <span>이메일을 입력해주세요.</span>
                    </Error>
                </div>

                <input type='button' id="button" value="비밀번호 찾기" class="btn btn-success" onClick={requestFindPw}></input>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    임시비밀번호가 입력하신 이메일로 발송되었습니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    확인
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}


export default FindPwPage;