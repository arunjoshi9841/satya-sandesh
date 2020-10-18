import { Button, Empty, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { getHeadlines, handleHeadlines } from './featureSlice';
import HeadingCard from './HeadingCard';
import HeadlineDropZone from './HeadingDropZone';
const Headlines = ({ handleImport, isImportOpen }) => {
  const dispatch = useDispatch();
  const _headlines = useSelector((state) => state.feature.headlines);
  const [headline, setHeadline] = useState([]);
  useEffect(() => {
    dispatch(getHeadlines());
  }, []);
  useEffect(() => {
    setHeadline(_headlines);
  }, [_headlines]);
  const submitHeadlines = () => {
    dispatch(handleHeadlines(headline));
  };
  const handleMotion = (from, to) => {
    let prevH = headline[to];
    let newH = headline[from];
    let temp = [...headline];
    temp.splice(from, 1, prevH);
    temp.splice(to, 1, newH);
    setHeadline([...temp]);
  };
  return (
    <div className='px-2'>
      <div className='flex justify-between items-center pt-2 pb-4'>
        <p className='text-lg'>Drag headlines to rearrange them.</p>
        <Button type='primary' onClick={handleImport}>
          {isImportOpen ? 'Close Import' : 'Import Article'}
        </Button>
      </div>

      {headline.length > 0 ? (
        <div>
          <DndProvider backend={HTML5Backend}>
            {headline.map((article, index) => (
              <div className='mb-4' key={index}>
                <HeadlineDropZone moveHeading={handleMotion} position={index}>
                  <HeadingCard article={article} position={index} />
                </HeadlineDropZone>
              </div>
            ))}
          </DndProvider>
          <div className='flex justify-end py-4'>
            <Popconfirm
              title='Are you sure you want to set these articles as Headlines?'
              onConfirm={submitHeadlines}
              okText='Yes'
              cancelText='No'
            >
              <Button type='primary'>Submit</Button>
            </Popconfirm>
          </div>
        </div>
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default Headlines;
