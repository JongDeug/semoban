// import logo from './logo.svg';
import React, { useEffect, useRef, useState } from "react";
import Main from './Pages/Main';
import Header from './Components/Header';
import Header2 from "./Components/Header2";
import { Route, Routes } from "react-router-dom";
import FindIdPage from './Pages/FindId';
import FindPwPage from './Pages/FindPassword';
import ChangePwPage from './Pages/ChangePw';
import LeaveIdPage from './Pages/LeaveId';
import RequestRegister from './Pages/RequestRegister';
import Login from './Pages/Login';
import UpdateMember from './Pages/UpdateMember';
import Board from './Pages/FreeBoard';
import Comments from './Components/Post/Comment';
import PostDetail from './Pages/PostDetail';
import RegisterPost from './Pages/RegisterPost';
import UpdatePost from './Pages/UpdatePost';
import Logout from './Pages/Logout';
import BoardFree from './Pages/BoardAnything';
import BoardBoast from './Pages/BoardBoast';
import BoardInfo from './Pages/BoardInfo';
import BoardQues from './Pages/BoardQues';
import MyPostPage from './Pages/MyPostPage';
import MyCommentPage from './Pages/MyCommentPage';
import MyLikePage from './Pages/MyLikePage';
// import NewsArticleList from './Pages/NewsArticleList';
import axios from 'axios';
import ArticleNewsList from "./Pages/ArticleNewsList"; //뉴스리스트
import ArticleNewsDetail from "./Pages/ArticleNewsDetail"; //뉴스상세
import VideoNewsList from "./Pages/VideoNewsList"; //유튜브뉴스리스트
import VideoNewsDetail from "./Pages/VideoNewsDetail"; //  유튜브뉴스상세
import ManagerLogin from "./Pages/ManagerLogin"; //  관리자 로그인
import ManagerLogout from "./Pages/ManagerLogout"; //  관리자 로그아웃
import ManagerHeader from "./Components/ManagerHeader"; // 관리자용 헤더. 관리자 메뉴(회원관리,변수조정) 화면으로 가는데 필요
import MemberList from "./Pages/MemberList"; //  회원관리에서 회원 리스트로 출력
import MemberDetail from "./Pages/MemberDetail"; //  회원리스트 누르면 상세정보 출력
import VariableControl from "./Pages/VariableControl"; //  시스템 변수 조정(인기/추천/뉴스)

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = sessionStorage.getItem("accessToken");

  function refreshToken(){
    const token = sessionStorage.getItem("accessToken");

    return axios({
      url:`/auth/refresh`,
      method:"get",
      headers:{
        Authorization: `Bearer ${token}`
      },
    }).then((res)=>{
      console.log(res.data.responseData);
      console.log("refreshToken");
      sessionStorage.setItem("accessToken", res.data.responseData.result.accessToken);
      
    }).catch((err)=>{
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      }
    })
  }
  function setAdminState() {
    if (sessionStorage.getItem("state")==="manager") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  useEffect(()=>{
    // refreshToken();
    setAdminState();
  },[]);
  // useEffect(()=>{
  // },[token]);

  return (
    <>
    {isAdmin?
    <ManagerHeader></ManagerHeader>
    :
    <Header2></Header2>
    }
    
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/register" element={<RequestRegister />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/updatemem" element={<UpdateMember />}></Route>
        <Route path="/findid" element={<FindIdPage />}></Route>
        <Route path="/findpassword" element={<FindPwPage />}></Route>
        <Route path="/changepassword" element={<ChangePwPage />}></Route>
        <Route path="/leaveid" element={<LeaveIdPage />}></Route>
        <Route path="/board/free" element={<BoardFree />}></Route>
        <Route path="/board/boast" element={<BoardBoast />}></Route>
        <Route path="/board/info" element={<BoardInfo />}></Route>
        <Route path="/board/question" element={<BoardQues />}></Route>
        <Route path='/comments' element={<Comments />}></Route>
        {/* <Route path='/post' element={<PostDetail />}></Route> */}
        <Route path='/post/:postType/:postId' element={<PostDetail />}></Route>
        <Route path='/writepost' element={<RegisterPost />} component={RegisterPost}></Route>
        <Route path='/updatepost/:postType/:postId' element={<UpdatePost />}></Route>
        <Route path='/myact/post' element={<MyPostPage />}></Route>
        <Route path='/myact/like' element={<MyLikePage />}></Route>
        <Route path='/myact/comment' element={<MyCommentPage />}></Route>
        <Route path='/news/articlelist' element={<ArticleNewsList />}></Route>
        <Route
          path="/articleNews/:newsId"
          element={<ArticleNewsDetail />}
        ></Route>
        <Route path="/news/videolist" element={<VideoNewsList />}></Route>
        <Route
          path="/videoNews/:videoNewsId"
          element={<VideoNewsDetail />}
        ></Route>
        <Route path="/managerlogin" element={<ManagerLogin />}></Route>
        <Route path="/managerlogout" element={<ManagerLogout />}></Route>
        <Route path="/memberlist" element={<MemberList />}></Route>
        <Route
          path="/memberdetail/:memberId"
          element={<MemberDetail />}
        ></Route>
        <Route path="/variablecontrol" element={<VariableControl />}></Route>
      </Routes>
    </>
  );
}

export default App;