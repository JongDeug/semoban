import {React} from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/board.css';

function BodyContents(props) {
    const [postId, setPostId] = useState(props.post._id);
    const [postTitle, setPostTitle] = useState(props.post.postTitle);
    const [postUserId, setPostUserId] = useState(props.post.userId);
    const [postDate, setPostDate] = useState(props.post.postTime);
    const [postHit, setPostHit] = useState(props.post.hit);
    const [postLikehit, setPostLikehit] = useState(props.post.likeHit);
    const [postType, setPostType]= useState(props.post.postType);
    const [ispcsize, setIspcsize] = useState(true);
    const commentCount = props.post.commentCount;

    console.log(props.post);
    console.log(props.likeHit);

    var postBoard;
    if(postType === "질문 게시판"){
        postBoard = "boardQuestion";
    }else if(postType === "자유 게시판"){
        postBoard = "boardAnything";
    }else if(postType === "자랑 게시판"){
        postBoard = "boardBoast";
    }else if(postType === "정보 공유 게시판"){
        postBoard = "boardInformation";
    }

    function changeContent(){
        var tabWidth = window.matchMedia("screen and (min-width:480px)");
        var pcWidth = window.matchMedia("screen and (min-width:800px)");
        if(pcWidth.matches){
            setIspcsize(true);
        }
        
        else{
            setIspcsize(false);
        }
    }
    useEffect(()=>{
        changeContent();
    },[]);
    return (
        <tr>
            {/* <th className='content post_id'>{postId}</th> */}
            {ispcsize?
                <><th className='content post_title'>
                    <Link to={{pathname:`/post/${postBoard}/${postId}`, state:{postBoard:postBoard, postId:postId}}} className='post_link'>
                        {commentCount?<div>{postTitle+" ("+commentCount+")"}</div>:<div>{postTitle}</div>}
                    </Link>
                </th>
                <th className='content post_writer'>{postUserId}</th>
                <th className='content post_date'>{postDate}</th>
                <th className='content post_hit'>{postHit}</th>
                <th className='content post_likehit'>{postLikehit.length}</th>
            </>
            :
            <>
                <th className='content post_title'>
                    <Link to={{pathname:`/post/${postBoard}/${postId}`, state:{postBoard:postBoard, postId:postId}}} className='post_link'>
                    {commentCount?<div>{postTitle+" ("+commentCount+")"}</div>:<div>{postTitle}</div>}
                    </Link>
                </th>
                <th className='content post_hit'>{postHit}</th>
            </>
            }
        </tr>
    )
}

export default BodyContents;