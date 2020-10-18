import React from 'react';
import {Comment, Avatar} from "antd"
const Author = ({author, image, date}) => {
    return (
        <Comment
      author={author}
      avatar={
        <Avatar
          src={image}
          alt={author}
        />
      }
    content={<p className="text-xs">{
      date}</p>
      }/>
    );
};

export default Author;