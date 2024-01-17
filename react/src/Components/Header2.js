import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useEffect, useState, useRef } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "../css/header2.css";
import logo from "../semobanlogo_3.png";
import { AiFillBell } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Badge from "react-bootstrap/Badge";
import CommentNotice from "./Commentnotice";
import axios from "axios";

function Header2() {
  const usermenu = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [noticelist, setNoticelist] = useState([]);
  const [show, setShow] = useState(false);

  // const showDropdown = (e) => {
  //   setShow(!show);
  // };
  const hideDropdown = (e) => {
    setShow(false);
  };

  function setLoginState() {
    if (!!sessionStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  const handleClickOutSide = (e) => {
    // console.log(usermenu.current.contains(e.target));
    if (isLogin) {
      if (setIsClicked && !usermenu.current.contains(e.target)) {
        setIsClicked(false);
      }
    }
  };

  function requestNotice() {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: "/api/notice",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.responseData.result);
        setNoticelist(res.data.responseData.result);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  function requestNoticeDelete(noticeId) {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: "/api/notice",
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        noticeId: noticeId,
      },
    })
      .then((res) => {
        console.log(res.data.responseData.result);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  function clicktest(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }
  function setDeleteList(id) {
    console.log(id);
    setNoticelist(noticelist.filter((notice) => notice.id !== id));
    console.log(noticelist);
  }
  useEffect(() => {
    console.log(sessionStorage.getItem("accessToken"));
    setIsClicked(false);
    setLoginState();
    requestNotice();
  }, []);
  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  });

  return (
    <Navbar collapseOnSelect expand="lg mt-3" variant="light">
      <Container className="nav-cont">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav>
              <Link to="/" className="logo_header_link">
                <img src={logo} href="/main" className="logo_header"></img>
              </Link>
              <Nav.Link href="/" className="manager-nav-item nav-link homebtn">
                홈
              </Nav.Link>
              <NavDropdown
                title="게시판"
                className="nav_dropdown"
                id="collasible-nav-dropdown"
                // show={show}
                // onMouseEnter={showDropdown}
                // onMouseLeave={hideDropdown}
              >
                <NavDropdown.Item href="/board/free">
                  자유 게시판
                </NavDropdown.Item>
                <NavDropdown.Item href="/board/boast">
                  자랑 게시판
                </NavDropdown.Item>
                <NavDropdown.Item href="/board/info">
                  정보공유 게시판
                </NavDropdown.Item>
                <NavDropdown.Item href="/board/question">
                  질문 게시판
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="뉴스"
                className="nav_dropdown"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/news/videolist">
                  영상 뉴스
                </NavDropdown.Item>
                <NavDropdown.Item href="/news/articlelist">
                  기사 뉴스
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="나의 활동" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/myact/post">
                  작성한 게시글 조회
                </NavDropdown.Item>
                <NavDropdown.Item href="/myact/comment">
                  작성한 댓글 조회
                </NavDropdown.Item>
                <NavDropdown.Item href="/myact/like">
                  좋아요 한 게시글 조회
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="nav-icon">
              {isLogin ? (
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  rootClose
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Header as="h3" className="popover-header">
                        알림 목록
                      </Popover.Header>
                      <Popover.Body>
                        <div class="list-group">
                          {noticelist.map((comment, i) => (
                            <CommentNotice
                              comment={comment}
                              deletelist={setDeleteList}
                            ></CommentNotice>
                          ))}
                        </div>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Nav.Link>
                    <div className="icon member dropdown">
                      <AiFillBell
                        size={24}
                        onClick={requestNotice}
                      ></AiFillBell>
                    </div>
                    <span class="position-absolute translate-middle p-2 bg-danger border border-light rounded-circle notification-badge">
                      <span class="indicator">{noticelist.length}</span>
                    </span>
                  </Nav.Link>
                </OverlayTrigger>
              ) : (
                <></>
              )}
              {isLogin && (
                <Nav.Link ref={usermenu}>
                  <div className="icon member dropdown">
                    <BsFillPersonFill
                      size={24}
                      onClick={(e) => setIsClicked(!isClicked)}
                      className="data"
                    ></BsFillPersonFill>
                    <Dropdown visibility={isClicked}>
                      <ul className="boardmenu icon_content">
                        <li className="li_menu">
                          <Link onClick={() =>
                              (window.location.href = `/updatemem`)}
                              className="link_menu">
                            회원정보 수정
                          </Link>
                        </li>
                        <li className="li_menu">
                          <Link to="/logout" className="link_menu">
                            로그아웃
                          </Link>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </Nav.Link>
              )}
              {isLogin && (
                <span className="greeting-member">
                  안녕하세요 {sessionStorage.getItem("host")} 회원님!
                </span>
              )}
              {!isLogin && (
                <div className="no_login">
                  <div>
                    <Link to="/login" className="header-login-btn">
                      로그인
                    </Link>
                  </div>
                  <div>
                    <Link to="/register" className="header-join-btn">
                      회원가입
                    </Link>
                  </div>
                </div>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;