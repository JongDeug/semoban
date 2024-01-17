import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [memberId, setMemberId] = useState(props.member._id);
  const [userId, setUserId] = useState(props.member.userId);
  const [userName, setUserName] = useState(props.member.userName);
  // const [newsDescription, setNewsDescription] = useState(
  //   props.news.newsDescription
  // );
  // 가입일자나 이름 이런것들?

  return (
    <tr>
      <th className="content post_title text-center">
        <Link
          to={{ pathname: `/memberdetail/${memberId}`, state: memberId }}
          className="post_link"
        >
          {userId}
        </Link>
      </th>
      <th className="content post_writer">{userName}</th>
    </tr>
  );
}

export default BodyContents;
