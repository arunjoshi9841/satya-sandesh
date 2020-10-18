import { Button, Popconfirm, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyText from './BodyText';
import Initialize from './Initialize';
import { getLabels } from '../labels/labelSlice';
import {useLocation, useHistory} from "react-router-dom";
import {getPost, setPostView} from "./postSlice";
import {
  deletePost,
  handlePost,
  post,
  reviewPost,
  setStep,
  step,
} from './postSlice';
import Preview from './Preview';
import Review from './Review';
const Post = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const post_step = useSelector(step);
  const _loading = useSelector((state) => state.post.isLoading);
  const location = useLocation();
  const _post = useSelector(post);
  const [error, setError] = useState(true);
  useEffect(() => {
    dispatch(getLabels());
  }, []);
  useEffect(()=>{
    let id = location.search;
    if(location.search.includes('?articleId=')){
      id = id.split('?articleId=')[1];
      dispatch(getPost(id));
    }else{
      dispatch(setPostView());
    }
  }, [location])
  useEffect(() => {
    if (post_step === 0) {
      if (
        _post.title.length > 0 &&
        _post.summary.length > 50 &&
        _post.summary.length < 300
      ) {
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(false);
    }
  }, [_post]);
  const getContent = () => {
    switch (post_step) {
      case 0:
        return <Initialize />;
      case 1:
        return <BodyText />;
      case 2:
        return <Review />;
      default:
        return <Initialize />;
    }
  };
  const handleBack = () => {
    dispatch(setStep(post_step - 1));
  };
  const handleSubmit = () => {
    dispatch(handlePost());
  };
  const handleDelete = () => {
    dispatch(deletePost());
  };
  const handleReview = () => {
    dispatch(reviewPost());
  };
  return (
    <Spin tip='Loading...' size='large' spinning={_loading}>
      <div className='flex-grow flex flex-col py-8'>
        <div className='flex flex flex-wrap justify-between'>
          <div className='flex-grow flex flex-col'>
            {getContent()}
            <div className='flex justify-end px-6 py-4'>
              {post_step !== 0 && (
                <Button type='primary' onClick={handleBack} className='mx-4'>
                  Back
                </Button>
              )}
              <Popconfirm
                title='Are you sure you want delete this Article?'
                onConfirm={handleDelete}
                okText='Yes'
                cancelText='No'
              >
                {_post.articleId !== -1 && post_step !== 2 && (
                  <Button type='primary' className='mr-4'>
                    Delete
                  </Button>
                )}
              </Popconfirm>
              <Popconfirm
                title='Are you sure you want to send this article for review?'
                onConfirm={handleReview}
                okText='Yes'
                cancelText='No'
              >
                {post_step === 2 && (
                  <Button type='primary' className='mr-4'>
                    Send for review
                  </Button>
                )}
              </Popconfirm>
              {post_step === 2 && (
                  <Button type='primary' className='mr-4' onClick={()=>history.push('/articles')}>
                    Save and continue later
                  </Button>
                )}
              {post_step !== 2 &&
                (_post.articleId === -1 ? (
                  <Button
                    type='primary'
                    onClick={handleSubmit}
                    disabled={error}
                  >
                    Create Post
                  </Button>
                ) :
                  <Button
                    type='primary'
                    onClick={handleSubmit}
                    disabled={error}
                  >
                    Next
                  </Button>
                )}
            </div>
          </div>
          {post_step !== 2 && (
            <div className='flex mt-6 mx-auto items-center'>
              <Preview />
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default Post;
