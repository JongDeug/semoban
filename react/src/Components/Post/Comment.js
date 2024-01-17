import axios from 'axios';
import React, {useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import '../../css/comment.css';

function Comment (props) {
    const [userId, setUserId] = useState(props.comment.userId);
    const [contents, setContents] = useState(props.comment.contents);
    const [commentTime, setcommentTime] = useState(props.comment.commentTime);
    const [onUpdate, setOnUpdate] = useState(false);
    const [commentId, setCommentId] = useState(props.comment._id);    
    const [postId, setPostId] = useState(props.comment.postId);
    const [commentType,setCommentType] = useState(props.comment.commentType);
    const [isUser, setIsUser] = useState(props.currentUser===userId);
    const [isAdmin, setIsAdmin] = useState(props.isAdmin);
    console.log(props);
    var postBoard;
    if(commentType === "질문 게시판"){
        postBoard = "boardQuestion";
    }else if(commentType === "자유 게시판"){
        postBoard = "boardAnything";
    }else if(commentType === "자랑 게시판"){
        postBoard = "boardBoast";
    }else if(commentType === "정보 공유 게시판"){
        postBoard = "boardInformation";
    }
    function requestCommentPut(){
        const token = sessionStorage.getItem("accessToken");
    
        return axios({
            url: `/api/${postBoard}/comment/manage`,
            method:'put',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                commentId : commentId,
                contents : contents,
            }
        }).then((res)=>{
            return res.data.responseData.redirect;
        }).then((res)=>{
            window.location = `${res}`;
        }).catch((err)=>{
            if (err) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        });
    }
    function requestCommentDelete(){
        const token = sessionStorage.getItem("accessToken");
        setPostId(`${props.comment.postId}`);
        return axios({
            url: `/api/${postBoard}/comment/manage`,
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                postId: `${postId}`,
                commentId: commentId,
            },
        }).then((res)=>{
            return res.data.responseData.redirect;
        }).then((res)=>{
            window.location = `${res}`;
        }).catch((err)=>{
            if (err) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        });
    }

    const onUpcontentHandler=(event)=>{
        setContents(event.currentTarget.value);
    }
    function isUpdating(){
        setOnUpdate(true);
    }
    function EndUpdating(){
        setOnUpdate(false);
    }

    return (
        <div className='comment_content'>
            <div className='username'>{userId}</div>
            {
                onUpdate?
                <textarea className='update_comment' defaultValue={contents} onChange={onUpcontentHandler}></textarea>
                :
                <div className='comment'>{contents}</div>
            }
            <div className='lastline'>
                <div className='comment_time'>{commentTime}</div>
                {
                    onUpdate?
                    <input type='button' value='작성' className='cmtbtn comment_write' onClick={()=>{EndUpdating();  requestCommentPut();}}></input>
                    :
                    (
                    (isUser||isAdmin)&&<span className='commentbtn'>
                    <input type='button' value='수정' className='cmtbtn comment_update' onClick={isUpdating}></input>
                    <input type='button' value='삭제' className='cmtbtn comment_delete' onClick={requestCommentDelete}></input>
                    </span>)
                }
            </div>
        </div>
    )
}


export default Comment;