import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import NewsContent from '../Components/News/NewsContent';
import '../css/news.css';

function NewsArticleList() {

    function ShowNews(){
        return(
        <>
        <NewsContent></NewsContent>
        <NewsContent></NewsContent>
        <NewsContent></NewsContent>
        <NewsContent></NewsContent>
        <NewsContent></NewsContent>
        </>
        )
    }

    return(        
        <>
        <h2>뉴스 기사 목록</h2>
        <div className='newslist'>
            <article className='news_article'>
            <Table striped bordered hover>
            <div className=''></div>
                <thead>
                    <tr className='board_head'>
                        <th className='post_title head'>작성한 댓글 목록</th>
                    </tr>
                </thead>
                <tbody>
                    <ShowNews></ShowNews>
                </tbody>
            </Table>
            </article>
        </div>
        </>
    )
}

export default NewsArticleList;