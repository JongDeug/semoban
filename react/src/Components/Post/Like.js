import "../../css/like.css"
import { Button } from "react-bootstrap";
import { GoHeart } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from 'axios';


function Like(props) {
  const [isLiked, setIsLiked] = useState(props.likeHitBool);
  const [postid, setPostid] = useState(props.postid);
  const [likeHit, setLikeHit] = useState(props.likeHit);

  const likeBtnStyle = {
    likeBtn: {
      color: isLiked ? "red" : "grey",
    },
  };
  useEffect(()=>{
    console.log(props);
    console.log(likeHit);
    setIsLiked(props.likeHitBool);
    setLikeHit(props.likeHit);
  })

  function requestLike(){
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: `/api/${props.postBoard}/like/${postid}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.responseData.result);
        setIsLiked(res.data.responseData.result.likeHitBool);
        props.setLikeHitBool(res.data.responseData.result.likeHitBool);
        setLikeHit(res.data.responseData.result.likeHit);
        props.setLikeHit(res.data.responseData.result.likeHit);
        console.log(postid);
        return res.data.responseData.result;
      })
      .catch((err) => {
        if (err) {
          console.log(props.postid);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  function onChangeState() {
    setIsLiked(!isLiked);
    props.setLikeHitBool(!isLiked);
  }

  return (
    <div>
      <GoHeart
        style={likeBtnStyle.likeBtn}
        onClick={()=>{ requestLike();}}
        size={36}
        className="likeBtn"
      ></GoHeart>
      <span>{likeHit.length}</span>
    </div>
  );
}

export default Like;
