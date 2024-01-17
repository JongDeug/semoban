import { isDisabled } from '@testing-library/user-event/dist/utils';
import {React, useEffect, useState} from 'react';
import { Button, Nav } from 'react-bootstrap';
import '../../css/board.css';

function Pagination ({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);
    let startNum = 1;
    let endNum = 11;
    if(total>10){
        if(page>5){
            startNum = page-4;
                endNum = page+6;
        }
    }
    
    console.log(numPages);
    console.log(startNum);
    console.log(endNum);


    return (
        <Nav className='paging_nav'>
            <Button className='paging_button' onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</Button>
            {numPages>0&&Array(numPages).slice(startNum-1,endNum-1).fill().map((v,i)=>(
                <Button 
                    className={(i+startNum-1)===(page-1)?'paging_button thispage':'paging_button'}
                    key={i+1} 
                    onClick={() => setPage(i + startNum)}
                >
                    {i+startNum}
                </Button>
            ))}
            <Button className='paging_button' onClick={() => setPage(page + 1)} disabled={page === numPages}>&gt;</Button>
        </Nav>
    );
}

export default Pagination;
