import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CreateList from './CreateList';
import PostCard from './PostCard';
import { getPosts, posts } from './postSlice';
const Posts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const _posts = useSelector(posts);
  const _loading = useSelector((state) => state.post.isLoading);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const changeView = () => {
    history.push('/editor');
  };
  return (
    <Spin tip='Loading...' size='large' spinning={_loading}>
      <p className='text-2xl bold text-center max-w-xs lg:top-12 lg:text-left'>
        तपाइँका लेखहरू
      </p>
      <div className='flex-grow px-6'>
        <div className='flex flex-wrap justify-center mt-12'>
          <CreateList handleChange={changeView} />
          {_posts.map((post, index) => (
            <PostCard key={post.articleId} post={post} key={index}/>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default Posts;
