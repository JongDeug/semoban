import { React } from "react";
import { useEffect, useState } from "react";
import "../../css/board.css";

function MenuNames({ rowname }) {
  return <th>{rowname.name}</th>;
}

function MemberListHead(props) {
  return (
    <thead>
      <tr className="board_head text-center">
        {/* <th className='head'></th> */}
        <th className="news_title head">회원 아이디</th>
        <th className="news_description head text-center">회원 이름</th>
      </tr>
    </thead>
  );
}

export default MemberListHead;
