import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import PageLoader from '../../utils/PageLoader';
import Article from './Article';
import FbComments from './FbComments';
import { getPost } from './articleSlice';
const Post = () => {
  const dispatch = useDispatch();
  let { articleId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const loading = useSelector((state) => state.article.loading);
  const error = useSelector((state) => state.article.error);
  const article = useSelector((state) => state.article.article);
  useEffect(() => {
    dispatch(getPost(articleId));
  }, [location]);
  useEffect(() => {
    if (error) {
      history.push('/error');
    }
  }, [error]);
  return loading ? (
    <div className='w-full flex justify-center'>
      <PageLoader />
    </div>
  ) : (
    <div className='w-full flex flex-col justify-center'>
      {article.articleId !== -1 && <Article post={article} />}
      <FbComments />
    </div>
  );
};

export default Post;
