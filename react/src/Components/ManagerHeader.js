import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "../css/header2.css";
import logo from "../semobanlogo_3.png";
import { AiFillBell } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

function Header2() {
  const [isClicked, setIsClicked] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  function setLoginState() {
    if (!!sessionStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  useEffect(() => {
    console.log(sessionStorage.getItem("accessToken"));
    setIsClicked(false);
    setLoginState();
  }, []);

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
              {/* <NavDropdown title="관리자 활동" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/memberlist">
                  회원 관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/variablecontrol">
                  변수값 설정
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link
                href="/memberlist"
                className="manager-nav-item nav-link"
              >
                회원 관리
              </Nav.Link>
              <Nav.Link
                href="/variablecontrol"
                className="manager-nav-item nav-link"
              >
                변수값 설정
              </Nav.Link>
            </Nav>

            <Nav className="nav-icon">
              {isLogin && (
                <Nav.Link>
                  <div>
                    <Link to="/managerlogout" className="header-login-btn">
                      로그아웃&nbsp;
                      <FiLogOut
                        viewBox="0 2 24 24"
                        width="1.2em"
                        height="1.3em"
                      ></FiLogOut>
                    </Link>
                  </div>
                </Nav.Link>
              )}
              {/* 관리자 헤더에서 로그인 하는 경우는 없을 듯? */}
              {/* {!isLogin && (
                <div className="no_login">
                  <div>
                    <Link to="/login">로그인</Link>
                  </div>
                </div>
              )} */}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;
