import React from 'react';
import { useState, useRef, useEffect } from "react";
import styles from'../../css/Main.module.css';
import Card from './SlideCard';
import { debounce } from 'lodash';


function Carousel(props) {
    
    const [current, setCurrent] = useState(0);
    // const [style, setStyle] = useState({
    //     marginLeft: `-${current}00%`
    // });
    const [posts, setPosts] = useState(props.posts);
    const [moveLen,setMoveLen] = useState(100);
    // const [moveCnt, setMoveCnt] = useState(props.len);
    const moveCnt = useRef(props.len);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleResize = debounce(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, 1000);
    
    function changeMov(){
        var tabWidth = window.matchMedia("screen and (min-width:480px)");
        var pcWidth = window.matchMedia("screen and (min-width:800px)");
        if(pcWidth.matches){
            setMoveLen(current*33);
            // setMoveCnt(props.len-2);
            moveCnt.current = props.len-2;
        }
        
        else if(tabWidth.matches){
            setMoveLen(current*50);
            // setMoveCnt(props.len-1);
            moveCnt.current = props.len-1;
        }
        else{
            setMoveLen(current*100);       
            moveCnt.current = props.len;
        }
    }

    const imgSize = useRef(props.len);
    function moveSlide(i) {
        changeMov();
        let nextIndex = current + i;
        if(nextIndex<0){
            nextIndex = imgSize.current -1;
        }
        else if(nextIndex>=moveCnt.current){
            nextIndex = 0;
        }
        setCurrent(nextIndex);
    }
    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        changeMov();
        return() =>{
            window.removeEventListener('resize',handleResize);
        }
    },[current]);

    return(
        <>
        <div className={styles.container}>
            <div className={styles.slide}>
                <div className={styles.btn} onClick={() => { moveSlide(-1); }}><p className={styles.btntxt}>&lt;</p></div>
                <div className={styles.window}>
                    <div className={styles.flexbox} style={{marginLeft:`-${moveLen}%`}}>
                    {props.posts.current.map((img, i) => (
                        img.attachedFile[0]?
                        <Card imgsrc={img.attachedFile[0]} post={img} type={img.postType} content={img.postContent}></Card>
                        :
                        <Card imgsrc={"semobanlogo_3.png"} post={img} type={img.postType} content={img.postContent}></Card>
                    ))}
                    </div>
                </div>
                <div className={styles.btn} onClick={() => { moveSlide(1); }}><p className={styles.btntxt}>&gt;</p></div>
            </div>
        </div>
        </>
    )
}

export default Carousel;