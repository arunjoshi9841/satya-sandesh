import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Author from '../../utils/Author';
import { changeToNepali, getTodaysNepaliDate } from '../../utils/dateHandler';
import { user } from '../auth/authSlice';
import { getLabels } from '../labels/labelSlice';
import Labels from './Labels';
import PostStat from './PostStat';
import Sharables from './Sharables';
const Article = ({ post }) => {
  const dispatch = useDispatch();
  const _user = useSelector(user);
  useEffect(() => {
    dispatch(getLabels());
  }, []);
  return (
    <div className='w-full flex justify-center mt-8 pb-4 mb-6'>
      <div className='w-full sm:w-4/5'>
        {post.thumbnail !== '' && (
          <img
            alt='example'
            src={post.thumbnail}
            className='mx-auto w-full'
            style={{ maxHeight: '480px' }}
          />
        )}
        <div
          className='shadow-lg md:w-5/6 relative p-8 mx-auto bg-white border-b-2 border-primary'
          style={{ top: post.thumbnail !== '' ? '-40px' : '0px' }}
        >
          <p style={{ minHeight: '58px' }} className='text-lg font-bold'>
            {post.title}
          </p>
          <div className='flex justify-between items-center'>
            <Author
              author={post.authorName ? post.authorName : _user.displayName}
              image={post.authorImage ? post.authorImage : _user.photoURL}
              date={
                post.modifiedAt
                  ? changeToNepali(post.modifiedAt)
                  : getTodaysNepaliDate()
              }
            />
            <Sharables
              url={`https://satyasandesh.com/article/${post.articleId}`}
            />
          </div>
          <div className='flex justify-between items-center ml-8'>
            <Labels tags={post.labels} />
            {_user.role === 'admin' && <PostStat views={post.viewCount} />}
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: post.bodyText,
          }}
          className='py-6 px-2 md:w-5/6 mx-auto text-lg'
        ></div>
      </div>
    </div>
  );
};

export default Article;
