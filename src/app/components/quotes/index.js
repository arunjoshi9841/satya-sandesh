import React, { useState, useEffect } from 'react';
import QuoteEntry from './QuoteEntry';
import { Spin, Tooltip, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { updateQuote, getQuote } from './quoteSlice.js';
import { useDispatch, useSelector } from 'react-redux';
const Quote = () => {
  const dispatch = useDispatch();
  const _quote = useSelector((state) => state.quote.quote);
  const _loading = useSelector((state) => state.quote.isLoading);
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    dispatch(getQuote());
  }, []);
  const handleSave = (data) => {
    dispatch(updateQuote(data));
    setFlip(false);
  };
  return (
    <Spin tip='Loading...' size='large' spinning={_loading}>
      <div>
        <p className='text-2xl bold text-center max-w-xs lg:top-12 lg:text-left pb-12'>
          Display Quote
        </p>
        {_quote.id !== -1 && (
          <div className='mt-12 flex'>
            {flip ? (
              <div
                className='p-12 shadow-xl flex-grow max-w-md mx-auto'
                style={{ backgroundColor: '#ffffff' }}
              >
                <QuoteEntry
                  quote={_quote}
                  handleSave={handleSave}
                  flip={() => setFlip(false)}
                />
              </div>
            ) : (
              <blockquote
                className='p-12 italic text-2xl font-serif shadow-xl text-white mx-auto max-w-md'
                style={{ backgroundColor: '#1890FF' }}
              >
                <div className='z-50 flex justify-end'>
                  <Tooltip title='Edit' placement='bottom'>
                    <Button
                      type='secondary'
                      shape='circle'
                      icon={<EditOutlined />}
                      onClick={() => setFlip(true)}
                    />
                  </Tooltip>
                </div>
                <div className='flex'>
                  <p className='font-bold text-4xl'>&#8220;</p>
                  <p className='pt-8 px-3 text-2xl font-bold'>{_quote.quote}</p>
                  <p className='font-bold text-4xl'>&#8221;</p>
                </div>
                <cite
                  className='float-right
            '
                >
                  -{_quote.author}
                </cite>
              </blockquote>
            )}
          </div>
        )}
      </div>
    </Spin>
  );
};

export default Quote;
