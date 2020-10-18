import React, { useState, useEffect } from 'react';
import Article from '../article/Article';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, handleDraft, handlePublish } from './reviewSlice';
import { Pagination, Popconfirm, Button, Spin } from 'antd';
const Review = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.review.articles);
  const _loading = useSelector((state) => state.review.isLoading);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  const onChange = (num) => {
    setPage(num);
  };

  const Draft = () => {
    let id = articles[page - 1].articleId;
    dispatch(handleDraft(id));
  };
  const Publish = () => {
    let id = articles[page - 1].articleId;
    dispatch(handlePublish(id));
  };
  return (
    <Spin tip='Loading...' size='large' spinning={_loading}>
      <div className='flex-grow flex flex-col'>
        <p className='text-2xl bold text-center max-w-xs lg:top-12 lg:text-left pb-12'>
          Review
        </p>
        {articles.length && !_loading > 0 ? (
          <div>
            <div className='py-4 flex-grow flex justify-center'>              
              <Pagination
                current={page}
                onChange={onChange}
                total={articles.length*10}
              />
            </div>
            <Article post={articles[page - 1]} />
            <div className='flex justify-end px-6 py-4'>
              <Popconfirm
                title='Are you sure you want to send it back for editing?'
                onConfirm={Draft}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary' className='mr-4'>
                  Send for Edit
                </Button>
              </Popconfirm>
              <Popconfirm
                title='Are you sure you want publish this Article?'
                onConfirm={Publish}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary' className='mr-4'>
                  Publish
                </Button>
              </Popconfirm>
            </div>
            <div className='py-4 flex-grow flex justify-center'>
              <Pagination
                current={page}
                onChange={onChange}
                total={articles.length*10}
              />
            </div>
          </div>
        ) : (
          <p className='text-2xl bold text-center py-12'>
            No articles to review
          </p>
        )}
      </div>
    </Spin>
  );
};

export default Review;
