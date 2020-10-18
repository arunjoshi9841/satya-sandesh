import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tag, Tooltip } from 'antd';
import React from 'react';
const LabelCard = ({ label, handler, handleDelete }) => {
  const handleClick = () => {
    handler(label);
  };
  const confirm =(e)=>{
    e.stopPropagation();
    handleDelete(label.labelId);
  }
  return (
    <div
      className='shadow-md p-4 hover:opacity-50 cursor-pointer m-2 w-32 flex flex-col'
      onClick={handleClick}
      style={{ backgroundColor: `${label.color}4D`, height: '135px' }}
    >
      <div className='pt-2'>
        <Tag color={label.color}>{label.name}</Tag>
      </div>
      {label.isNavigation && (
        <div className='pt-2 flex items-center'>
          <CheckCircleOutlined style={{ fontSize: '14px', color: 'green' }} />
          <p className='pl-2 text-xs'>Navigation</p>
        </div>
      )}
      <div className='z-50 flex flex-grow justify-end pt-4 items-end'>
        <Popconfirm
          title='Are you sure you want to delete this label?'
          onConfirm={confirm}
          okText='Yes'
          cancelText='No'
        >
          <Tooltip title='Delete' placement='bottom'>
            <Button type='primary' shape='circle' icon={<DeleteOutlined />} onClick={(e)=>e.stopPropagation()}/>
          </Tooltip>
        </Popconfirm>
      </div>
    </div>
  );
};

export default LabelCard;
