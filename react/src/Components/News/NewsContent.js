import React from 'react';
import { useState,useEffect } from 'react';
import '../../css/news.css';

function NewsContent() {


    return(
        <tr>
            <th className='content post_title'>
                <div>뉴스제목</div>
                
                <div className='news_description'>
                    뉴스요약
                </div>
            </th>
        </tr>
    )
}

export default NewsContent;