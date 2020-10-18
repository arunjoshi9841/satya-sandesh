import { Card, Divider } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeToNepali } from '../../utils/dateHandler';
const Featured = () => {
  const history = useHistory();
  const featured = useSelector((state) => state.home.posts.featured);
  const openArticle = (id) => {
    history.push(`/article/${id}`);
  };
  return (
    featured.length>0&&<div className='flex-grow pl-0 sm:pl-4 flex flex-col my-8 pb-2'>      
      <Divider orientation="left"><p className="text-primary text-xl">Featured</p></Divider>
      <div className='w-full grid sm:grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly'>
        {featured.map((post, index) => (
          <Card
            style={{
              maxWidth: 300,
              margin: '4px',
              border: 'none',
              backgroundColor: 'transparent',
            }}
            cover={
              <img alt='example' src={post.thumbnail} width='auto' />
            }
            hoverable
            key={index}
            onClick={() => openArticle(post.articleId)}
          >
            <Card.Meta
              description={
                <div>
                  <p className='font-bold text-xl text-black'>{post.title}</p>
                  <p className='text-lg pb-2'>
                    {changeToNepali(post.modifiedAt)}
                  </p>
                  <p className='text-lg'>{post.summary}</p>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Featured;
