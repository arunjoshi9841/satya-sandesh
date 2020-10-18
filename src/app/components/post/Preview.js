import React from 'react';
import { useSelector } from 'react-redux';
import Article from '../article/Article';
import { post } from './postSlice';
const Preview = () => {
  const _post = useSelector(post);
  const resolution = 768 / 1024;
  const vheight = 340 / resolution;
  return (
    <div
      className='overflow-y-auto mx-auto bg-white shadow-lg'
      style={{
        position: 'relative',
        width: 340,
        height: vheight,
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          border: 'none',
          transform: 'translate(-50%, -50%) scale(0.42)',
          width: 768,
          height: 1024,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Article post={_post} />
      </div>
    </div>
  );
};

export default Preview;
