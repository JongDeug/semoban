import React, {useEffect, useState } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BoardHead from '../Components/Board/BoardHead';
import BodyContents from '../Components/Board/BoardBody';
import Pagination from '../Components/Board/Pagination';
import '../css/board.css';
import { Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BiSearch} from 'react-icons/bi';
import Sidebar from '../Components/Sidebar';


function BoardFree () {
    const [posts, setPosts] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const serachOptionList = ["제목", "내용", "제목+내용"];
    const [searchPosts, setSearchPosts] = useState([]);
    const [searchOption, setSearchOption] = useState("제목");
    const offset = (page - 1) * limit;
    
    function requestGet() {
        return axios({
            url:"/boardAnything/read",
            method:"get",
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

    function requestSearch() {
        return axios({
            url:"/boardAnything/search",
            method:"post",
            data:{
                whatToSearch:searchWord,
                whereToSearch:searchOption,
            }
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
        console.log(posts);
    }, []);

    function onChangeSearchWord(event){
        setSearchWord(event.target.value);
    }
    function onSearchOption(event){
        setSearchOption(event.target.value);
    }
    function Search(){
        requestSearch();
    }

    function SearchEnter(event){
        if (event.key==='Enter'){
            Search();
        }
    }

    function ShowContents(){
        var startNum=0;
        if (posts.length-(limit+offset)>=0){
            startNum = posts.length-(limit+offset);
        } 
        const list = [];
        posts.slice(startNum,posts.length-offset).reverse().map((posts) => {
            list.push(<BodyContents post={posts}></BodyContents>)
        })
        return list;
    };
    

    
    return (
        <div className='all_content'>
        <h2>자유 게시판</h2>

        <div className='to_flex'>
            <main>
            <InputGroup className="mb-3">
                <select
                    className='select_search'
                    value = {searchOption}
                    onChange={onSearchOption}
                >
                    {serachOptionList.map((item)=>(
                        <option value={item} key={item}>{item}</option>
                    ))}
                </select>
                <input
                    placeholder="검색"
                    className='serach_input'
                    onChange={onChangeSearchWord}
                    onKeyPress={SearchEnter}
                />
                <Button variant="outline-secondary" id="button-addon2" className='searchbtn' onClick={Search}>
                    <BiSearch></BiSearch>
                </Button>
            </InputGroup>
            <div className='categoryNtable'>
                <Sidebar></Sidebar>
                <Table striped bordered hover>
                    <div className=''></div>
                        <BoardHead></BoardHead>
                        <tbody>
                            <ShowContents></ShowContents>
                        </tbody>
                </Table>
            </div>
            <div className='float-right'>
                <Link to={`/writepost`} state={{boardtype:'자유 게시판'}} className='link_to'>
                    <Button className='create_btn float-right'>
                        작성
                    </Button>
                </Link>
            </div>
            
            </main>
        </div>
        
        <Pagination total={posts.length} limit={limit} page={page} setPage={setPage}></Pagination>
        </div>
    );
}

export default BoardFree;