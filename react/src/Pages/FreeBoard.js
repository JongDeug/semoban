import React, {useEffect, useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BoardHead from '../Components/Board/BoardHead';
import BodyContents from '../Components/Board/BoardBody';
import Pagination from '../Components/Board/Pagination';
import '../css/board.css';
import { postList } from '../Data';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Board () {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    
    function requestGet() {
        const token = sessionStorage.getItem("accessToken");
        return axios({
            url:"/api/board/crud",
            method:"get",
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((res)=>{
            setPosts(res.data.responseData.result);
            console.log(res.data.responseData.result);
            console.log(posts);
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }

    useEffect(()=>{
        requestGet();
        // setPosts(postList);
        console.log(posts);
    }, []);

    function ShowContents(){
        const list = [];
            posts.slice(offset,offset+limit).map((posts) => {
                list.push(<BodyContents post={posts}></BodyContents>)
            }
            )
            return list;
    };
    
    return (
        <>
        <h2>전체 게시판</h2>

        <main>
        <InputGroup className="mb-3">
            <input
                placeholder="검색"
                className='serach_input'
            />
            <Button variant="outline-secondary" id="button-addon2">
                검색
            </Button>
        </InputGroup>
        <Table striped bordered hover>
            <div className=''></div>
                <BoardHead></BoardHead>
                <tbody>
                    <ShowContents></ShowContents>
                </tbody>
        </Table>
        <div className='float-right'><Link to='/writepost' className='link_to'><Button className='create_btn float-right'>작성</Button></Link></div>
        
        </main>
        <Pagination total={posts.length} limit={limit} page={page} setPage={setPage}></Pagination>
        </>
    );
}

export default Board;