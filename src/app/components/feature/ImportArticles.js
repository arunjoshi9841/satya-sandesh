import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedArticles } from './featureSlice';
import PublishedCard from './PublishedCard';
const ImportArticles = ({fromHeadline}) => {
  const dispatch = useDispatch();
  const published = useSelector((state) => state.feature.published);
  useEffect(() => {
    dispatch(getPublishedArticles());
  }, []);
  return (
    published.length>0&&<div className='flex flex-col shadow'>
      <div className='border-b-2 border-black py-4 pl-4'>
        <p className='text-xl'>Published Articles</p>
      </div>
      <div className='flex flex-col overflow-y-auto p-4' style={{maxHeight: "480px"}}>
        {published.map((article, index) => (
          <a href={`/article/${article.articleId}`} target='_blank' key={index}>
            <PublishedCard article={article} key={index} fromHeadline={fromHeadline}/>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ImportArticles;
