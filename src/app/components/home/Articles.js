import { List, Divider } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeToNepali } from '../../utils/dateHandler';
const Articles = () => {
  const history = useHistory();
  const other = useSelector((state) => state.home.posts.other);
  const openArticle = (id) => {
    history.push(`/article/${id}`);
  };
  return (
    other.length > 0 && (
      <div className='flex-grow pl-0 sm:pl-4 flex flex-col my-8'>
        <Divider orientation="left"><p className="text-primary text-xl">Others</p></Divider>
        {other.map((post, index) => (
          <div
            className='flex flex-col-reverse justify-center cursor-pointer hover:bg-white hover:shadow-lg p-4 md:flex-row md:flex-wrap md:justify-between md:flex-grow'
            key={index}
            onClick={() => openArticle(post.articleId)}
          >
            <List.Item.Meta
              title={<p className='font-bold text-xl'>{post.title}</p>}
              description={
                <div>
                  <p className='text-lg pb-2'>
                    {changeToNepali(post.modifiedAt)}
                  </p>
                  <p className='text-lg'>{post.summary}</p>
                </div>
              }
            />
            <div className='max-w-sm md:max-w-xs p-2 mx-auto py-4'>
              <img alt='example' src={post.thumbnail} width='auto' />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Articles;
