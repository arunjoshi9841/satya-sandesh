import React, { useState } from 'react';
import { Input, Tooltip, Button, Popconfirm } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
const QuoteEntry = ({ quote, handleSave, flip }) => {
  const [_quote, setQuote] = useState(quote);
  const handleChange = (e) => {
    setQuote({ ..._quote, [e.target.name]: e.target.value });
  };
  return (
    <div class='flex-grow'>
      <p className='text-2xl bold text-center mb-6'>Change Quote</p>
      <div className='pt-2 w-7/8 mx-auto'>
        <p className='pb-1'>Quote</p>
        <Input.TextArea
          value={_quote.quote}
          name='quote'
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className='pt-2 w-7/8'>
        <p className='pb-1'>Author</p>
        <Input value={_quote.author} name='author' onChange={handleChange} />
      </div>
      <div className='z-50 flex justify-end mt-6'>
        <Tooltip title='Cancel' placement='bottom'>
          <Button
            type='primary'
            shape='circle'
            icon={<CloseOutlined />}
            onClick={flip}
          />
        </Tooltip>
        <Popconfirm
          title={`Are you sure you want to edit the quote to ${_quote.quote}?`}
          onConfirm={() => handleSave(_quote)}
          okText='Yes'
          cancelText='No'
        >
          <Tooltip title='Save' placement='bottom'>
            <Button
              type='primary'
              shape='circle'
              icon={<SaveOutlined />}
              style={{ marginLeft: '8px' }}
            />
          </Tooltip>
        </Popconfirm>
      </div>
    </div>
  );
};

export default QuoteEntry;
