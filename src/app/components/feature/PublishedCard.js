import React from 'react';
import Author from '../../utils/Author';
import { changeToNepali } from '../../utils/dateHandler';
import { Tooltip, Button } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import {addHeadline} from "./featureSlice";
import {useDispatch} from "react-redux";
const PublishedCard = ({ article}) => {
  const dispatch = useDispatch();
  const handleClick = (e)=>{
    e.preventDefault();
    dispatch(addHeadline(article));
  };
  return (
      <div className='flex my-2 border-b-2 pb-1 cursor-pointer hover:shadow-lg'>
        <div className='flex-grow p-2'>
          <div className='flex'>
            <div className='flex-grow'>
              <p className='text-lg font-bold'>{article.title}</p>
              <Author
                author={article.authorName}
                image={article.authorImage}
                date={changeToNepali(article.modifiedAt)}
              />
            </div>
            <p className='px-4 text-sm uppercase'>{article.viewCount} Views</p>
          </div>
        </div>
        <div className='border-l-2 border-primary p-4 flex flex-col items-center justify-center w-32'>
          {article.badge === '' ? (
            <Tooltip title='Import' placement='bottom'>
              <Button
                type='primary'
                shape='circle'
                icon={<ImportOutlined />}
                onClick={handleClick}
              />
            </Tooltip>
          ) : (
            <div className='text-primary font-bold text-2xl p-6'>
              <p>{article.badge}</p>
            </div>
          )}          
        </div>
      </div>
  );
};

export default PublishedCard;
