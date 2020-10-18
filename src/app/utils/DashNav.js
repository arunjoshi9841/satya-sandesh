import {
  AlignCenterOutlined,
  BookOutlined,
  EditOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { user } from '../components/auth/authSlice';
const DashNav = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('/articles');
  const { role } = useSelector(user);
  useEffect(() => {
    let url = location.pathname;
    if (url.includes('editor')) {
      setActiveTab('/editor');
    } else if (url.includes('articles')) {
      setActiveTab('/articles');
    } else if (url.includes('labels')) {
      setActiveTab('/labels');
    } else if (url.includes('quotes')) {
      setActiveTab('/quotes');
    } else if (url.includes('feature')) {
      setActiveTab('/feature');
    } else if (url.includes('review')) {
      setActiveTab('/review');
    } else {
      setActiveTab('/articles');
    }
  }, [location]);
  const handleClick = (route) => {
    setActiveTab(route);
    history.push(route);
  };
  return (
    !location.pathname.includes('profile') && (
      <div className='w-full flex flex-row-reverse flex-wrap pr-2'>
        <div className='pl-2 py-2'>
          <Button
            type='primary'
            icon={<SnippetsOutlined />}
            size='middle'
            onClick={() => handleClick('/articles')}
            ghost={activeTab === '/articles'}
          >
            Your Articles
          </Button>
        </div>
        <div className='pl-2 py-2'>
          <Button
            type='primary'
            icon={<EditOutlined />}
            size='middle'
            onClick={() => handleClick('/editor')}
            ghost={activeTab === '/editor'}
          >
            Editor
          </Button>
        </div>
        {role === 'admin' && (
          <div className='pl-2 py-2'>
            <Button
              type='primary'
              icon={<BookOutlined />}
              size='middle'
              onClick={() => handleClick('/labels')}
              ghost={activeTab === '/labels'}
            >
              Labels
            </Button>
          </div>
        )}
        {role === 'admin' && (
          <div className='pl-2 py-2'>
            <Button
              type='primary'
              icon={<AlignCenterOutlined />}
              size='middle'
              onClick={() => handleClick('/quotes')}
              ghost={activeTab === '/quotes'}
            >
              Quote
            </Button>
          </div>
        )}
        {role === 'admin' && (
          <div className='pl-2 py-2'>
            <Button
              type='primary'
              icon={<SolutionOutlined />}
              size='middle'
              onClick={() => handleClick('/feature')}
              ghost={activeTab === '/feature'}
            >
              Feature
            </Button>
          </div>
        )}
        {role === 'admin' && (
          <div className='pl-2 py-2'>
            <Button
              type='primary'
              icon={<FormOutlined />}
              size='middle'
              onClick={() => handleClick('/review')}
              ghost={activeTab === '/review'}
            >
              Review
            </Button>
          </div>
        )}
      </div>
    )
  );
};

export default DashNav;
