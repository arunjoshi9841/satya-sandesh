import {
  LoginOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isLoggedIn, logout, user } from '../auth/authSlice';
import { toggleDialog } from '../login/loginSlice';

const AccountNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(isLoggedIn);
  const { photoURL } = useSelector(user);
  const handleClick = (e) => {
    switch (e.key) {     
      case 'articles':
        history.push('/articles');
        break;
      case 'profile':
        history.push('/profile');
        break;
      case 'logout':
        dispatch(logout());
        history.push('/');
        break;
      default:
        history.push('/');
        break;
    }
  };
  const getAvatar = () => {
    if (isAuthenticated) {
      return <Avatar shape='square' size='large' src={photoURL} />;
    } else {
      return <Avatar shape='square' size='large' icon={<UserOutlined />} />;
    }
  };
  const menu = isAuthenticated ? (
    <Menu onClick={handleClick}>
      {/* <Menu.Item
      key="dashboard"
        icon={
          <AppstoreOutlined style={{ fontSize: "20px", padding: "4px 0" }} />
        }
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
      key="profile"
        icon={<UserOutlined style={{ fontSize: "20px", padding: "4px 0" }} />}
      >
        Profile
      </Menu.Item> */}
      <Menu.Item
        key='articles'
        icon={
          <AppstoreOutlined style={{ fontSize: '20px', padding: '4px 0' }} />
        }
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        key='profile'
        icon={<UserOutlined style={{ fontSize: '20px', padding: '4px 0' }} />}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key='logout'
        icon={<LogoutOutlined style={{ fontSize: '20px', padding: '4px 0' }} />}
      >
        Logout
      </Menu.Item>
    </Menu>
  ) : (
    <Menu onClick={() => dispatch(toggleDialog())}>
      <Menu.Item
        icon={<LoginOutlined style={{ fontSize: '20px', padding: '4px 0' }} />}
      >
        Login
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement='bottomRight'>
      {getAvatar()}
    </Dropdown>
  );
};

export default AccountNav;
