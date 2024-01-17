import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BodyContents from "./MemberBody";
import Pagination from "../Components/Board/Pagination";
import MemberListHead from "../Components/Board/MemberListHead";
import "../css/board.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function MemberList() {
  const [member, setMember] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  function requestMemberList() {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: "/api/adminMember/manage",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMember(res.data.responseData.result);
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

  useEffect(() => {
    requestMemberList();
    console.log(member);
  }, []);

  function ShowContents() {
    const list = [];
    member.slice(offset, offset + limit).map((member) => {
      list.push(<BodyContents member={member}></BodyContents>);
    });
    return list;
  }

  return (
    <>
      <h2>회원 목록</h2>
      <div className="to_flex">
        <main>
          <Table striped bordered hover>
            <div className=""></div>
            <MemberListHead></MemberListHead>
            <tbody>
              <ShowContents></ShowContents>
            </tbody>
          </Table>

          <Pagination
            total={member.length}
            limit={limit}
            page={page}
            setPage={setPage}
          ></Pagination>
        </main>
      </div>
    </>
  );
}

export default MemberList;
