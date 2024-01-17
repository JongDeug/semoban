import React, { useRef } from 'react';

const Error =(props)=> {
    return (
        <article>
            {props.visibility&&props.children}
        </article>
    )
};

export default Error;