import { Button, Empty, Divider, Checkbox } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedArticles, featureArticle } from './featureSlice';
import { changeToNepali } from '../../utils/dateHandler';
import Author from '../../utils/Author';
const Featured = () => {
  const dispatch = useDispatch();
  const published = useSelector((state) => state.feature.published);
  useEffect(() => {
    dispatch(getPublishedArticles());
  }, []);
  const setFeatured = (e, id) => {
    e.preventDefault();
    dispatch(featureArticle(id));
  };
  return (
    <div className='px-2'>
      <div className='flex flex-wrap justify-center'>
        {published.map((article, index) => (
          <a href={`/article/${article.articleId}`} target='_blank' key={index}>
            <div
              className={`flex flex-col justify-between shadow p-4 m-2 w-56 cursor-pointer hover:shadow-xl hover:text-primary`}
              key={index}
            >
              <div>
                <p className='font-bold'>{article.title}</p>
                <Divider style={{ margin: '6px 0px' }} />
              </div>
              <div className='flex flex-col justify-end'>
                <Author
                  author={article.authorName}
                  image={article.authorImage}
                  date={changeToNepali(article.modifiedAt)}
                />
                <Divider style={{ margin: '6px 0px' }} />
                <div className='flex justify-end'>
                  {article.badge !== '' && (
                    <p className='rounded-lg bg-red-500 text-white px-2'>
                      Headline
                    </p>
                  )}
                  <div className='px-2'>
                    <Checkbox
                      onChange={(e) => setFeatured(e, article.articleId)}
                      checked={article.isFeatured}
                    >
                      Featured
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Featured;
