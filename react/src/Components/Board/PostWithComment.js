import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/board.css';

function PostWithComment(props){
    const [postId, setPostId] = useState(props.post.postId);
    const [commentContents, setCommentContents] = useState(props.post.contents);
    const [postType, setPostType] = useState(props.post.commentType);
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
    const titlestyle = {fontWeight: "bold"}

    return(
        <tr>
            <th className='content post_title'>
                <Link to={{pathname:`/post/${postBoard}/${postId}`, state:{postBoard:postBoard, postId:postId}}} className='post_link'>
                    
                    <div>{commentContents}</div>
                    </Link>
            </th>
        </tr>
    )
}

export default PostWithComment;