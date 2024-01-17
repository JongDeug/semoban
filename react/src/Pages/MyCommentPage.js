import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Components/Board/Pagination';
import Table from 'react-bootstrap/Table';
import PostWithComment from '../Components/Board/PostWithComment';

function MyCommentPage () {
    const menu = ["자유 게시판", "자랑 게시판", "공유 게시판", "질문 게시판"];
    const [currentTab, setCurrentTab] = useState(0);
    const [posts, setPosts] = useState([]);
    const [postsAny, setPostsAny] = useState([]);
    const [postsBoast, setPostsBoast] = useState([]);
    const [postsInfo, setPostsInfo] = useState([]);
    const [postsQues, setPostsQues] = useState([]);
    const [comments, setComments] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=>{
        requestGet();
        console.log(posts);
    }, []);

    function requestGet() {
        const token = sessionStorage.getItem("accessToken");
        return axios({
            url:"/api/memberActivity/myComment",
            method:"get",
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((res)=>{
            console.log(res.data.responseData.result);
            let list = [];
            res.data.responseData.result.anything&&res.data.responseData.result.anything.map((post)=>{
                list.push(post);
            })
            res.data.responseData.result.boast&&res.data.responseData.result.boast.map((post)=>{
                list.push(post);
            })
            res.data.responseData.result.information&&res.data.responseData.result.information.map((post)=>{
                list.push(post);
            })
            res.data.responseData.result.question&&res.data.responseData.result.question.map((post)=>{
                list.push(post);
            })
            setPosts(list);
            setPostsAny(res.data.responseData.result.anything);
            setPostsBoast(res.data.responseData.result.boast);
            setPostsInfo(res.data.responseData.result.information);
            setPostsQues(res.data.responseData.result.question);
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }

    function ShowContents(){
        var startNum=0;
        if (posts.length-(limit+offset)>=0){
            startNum = posts.length-(limit+offset);
        } 
        const list = [];
        posts&&Array.from(posts).slice(startNum,posts.length-offset).reverse().map((posts) => {
            list.push(<PostWithComment postid={posts.postId} posttype={posts.commentType} comment={posts.contents}></PostWithComment>)
        })
        return list;
    };
    function CommentbyBoard(){
        var startNum=0;
        
        const list = [];
        if(currentTab===0){
            if (postsAny.length-(limit+offset)>=0){
                startNum = postsAny.length-(limit+offset);
            } 
            postsAny&&Array.from(postsAny).slice(startNum,postsAny.length-offset).reverse().map((posts) => {
                list.push(<PostWithComment post={posts}></PostWithComment>)
            })
        } else if(currentTab===1){
            if (postsBoast.length-(limit+offset)>=0){
                startNum = postsBoast.length-(limit+offset);
            } 
            postsBoast&&Array.from(postsBoast).slice(startNum,postsBoast.length-offset).reverse().map((posts) => {
                list.push(<PostWithComment post={posts}></PostWithComment>)
            })
        } else if(currentTab===2){
            if (postsInfo.length-(limit+offset)>=0){
                startNum = postsInfo.length-(limit+offset);
            } 
            postsInfo&&Array.from(postsInfo).slice(startNum,postsInfo.length-offset).reverse().map((posts) => {
                list.push(<PostWithComment post={posts}></PostWithComment>)
            })
        } else if(currentTab===3){
            if (postsQues.length-(limit+offset)>=0){
                startNum = postsQues.length-(limit+offset);
            } 
            postsQues&&Array.from(postsQues).slice(startNum,postsQues.length-offset).reverse().map((posts) => {
                list.push(<PostWithComment post={posts}></PostWithComment>)
            })
        }
        return list;
    };

    function PagingByBoard(){
        if (currentTab===0){
            return <Pagination total={postsAny.length} limit={limit} page={page} setPage={setPage}></Pagination>
        } else if (currentTab===1){
            return <Pagination total={postsBoast.length} limit={limit} page={page} setPage={setPage}></Pagination>
        }else if (currentTab===2){
            return <Pagination total={postsInfo.length} limit={limit} page={page} setPage={setPage}></Pagination>
        }else if (currentTab===3){
            return <Pagination total={postsQues.length} limit={limit} page={page} setPage={setPage}></Pagination>
        }
    }

    function selectMenuHandler(index) {
        setCurrentTab(index);
    };

    return (
        <>
        <h2>내가 작성한 댓글</h2>
        <div className='to_flex'>
        <main>
        <div>
            <ul className='tabmenu'>
            {menu.map((ele, index)=>{
                return (
                    <li
                    key={index}
                    className={currentTab === index ? "submenu focused" : "submenu"}
                    onClick={()=> selectMenuHandler(index)}
                >
                {ele}
                </li>
                )
            })}
            </ul>
        </div>
        <Table striped bordered hover>
            <div className=''></div>
                <thead>
                    <tr className='board_head'>
                        <th className='post_title head'>작성한 댓글 목록</th>
                    </tr>
                </thead>
                <tbody>
                    <CommentbyBoard></CommentbyBoard>
                </tbody>
        </Table>
        </main>
        </div>
        <PagingByBoard></PagingByBoard>
        </>
    )
}

export default MyCommentPage;