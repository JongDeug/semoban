import {React} from 'react';
import { useState } from 'react';
import '../../css/board.css';

function PostTitle(props) {
    const [postTitle, setPostTitle] = useState(props.post.postTitle);

    return (
        
            <div className='content post_title'>{postTitle}</div>
        
    )
}

export default PostTitle;