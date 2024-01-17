import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';


function Sidebar() {
    const category = ["자유 게시판", "자랑 게시판", "정보 공유 게시판", "질문 게시판"];
    const categoryurl = ['free','boast','info','question'];
    function CategoryContent(props){
        var list=[];
        category.map((cate,i)=>{
            list.push(<li className='category_content'><Link to={`/board/${categoryurl[i]}`} className='side_link'>{cate}</Link></li>)
        });
        return list;
    }

    return (
        <ul className='category_area'>
            <CategoryContent></CategoryContent>
        </ul>
    )
}

export default Sidebar;