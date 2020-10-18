import React from 'react';
import { ItemTypes } from './Constants';
import { useDrag } from 'react-dnd';
import { changeToNepali } from '../../utils/dateHandler';
import Author from "../../utils/Author";
const HeadingCard = ({ article, position }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.HEADING, position: position},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div className={`flex items-center ml-10 shadow-lg ${position>3?'opacity-50':''}`}>
        {position<4&&<div className="rounded-full bg-red-600 text-white font-bold text-2xl p-6 -ml-10">
          {position<=4&&<p>{`H${position+1}`}</p>}
        </div>}
        <div className='flex-grow p-2 pl-6 hover:text-primary'>
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
        </div>
    </div>
  );
};

export default HeadingCard;
