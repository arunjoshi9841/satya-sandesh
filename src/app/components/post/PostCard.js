import React from 'react';
import { Divider } from 'antd';
import {changeToNepali} from "../../utils/dateHandler";
import { useHistory } from 'react-router-dom';
const PostCard = ({ post }) => {
  const history = useHistory();
  const handleSelection = () => {
    if (post.status === 'draft') {
      history.push(`/editor?articleId=${post.articleId}`);
    }
  };
  const getColor = () => {
    switch (post.status) {
      case 'draft':
        return 'red';
      case 'review':
        return 'blue';
      case 'published':
        return 'green';
      default:
        return 'red';
    }
  };
  return (
    <div
      className={`flex flex-col justify-between shadow p-4 ${
        post.status === 'draft' ? `cursor-pointer hover:shadow-lg` : ''
      } m-2 w-56`}
      style={{borderTop: "4px solid "+getColor()}}
      onClick={handleSelection}
    >
      <div>
        <p className='font-bold'>{post.title}</p>
        <Divider style={{ margin: '6px 0px' }} />
      </div>
      <p>{post.summary}</p>
      <div className="flex flex-col justify-end">
      <Divider style={{ margin: '6px 0px' }} />
      <div className="flex justify-end">
      {post.badge!==""&&<p className="rounded-lg bg-red-500 text-white px-2">Headline</p>}
      {post.isFeatured&&<p className="rounded-lg bg-green-500 text-white px-2 ml-2">Featured</p>}
      </div>
      <p className="text-primary text-right">{post.status}</p>
      <p className='text-right'>
        <b>परिमार्जित:</b> {changeToNepali(post.modifiedAt)}
      </p>
      </div>      
    </div>
  );
};

export default PostCard;
