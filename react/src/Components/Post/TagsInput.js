import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import "../../css/tagsInput.css";

export default function Tags(props) {
  const [selected, setSelected] = useState(props.keywords);
  const setKeywords = props.setKeywords;

  function SetKeywords(event){
    console.log("event:"+event.key);
    if (event.key==='Enter'){
        if(!(props.keywords[props.keywords.length-1].charAt(0)==="#")){
          props.keywords[props.keywords.length-1] = "#"+props.keywords[props.keywords.length-1];
        }
    }
  }

  console.log(selected);
  console.log(props.keywords);
  return (
    <>
      {/* <pre>{JSON.stringify(selected)}</pre> */}

      <TagsInput
        value={props.keywords}
        onChange={props.setKeywords}
        onKeyUp={SetKeywords}
        classNames="keywords_input"
        name="keywords"
        placeHolder="입력 후 엔터"
      />
      {/* <p>#을 붙이고 태그</p> */}
      {/* {setKeywords} */}
    </>
  );
}
