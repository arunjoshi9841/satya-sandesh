import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Spin, Alert, Tooltip } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import Upload from '../../utils/Upload';
import { isEmailValid, isPasswordValid, isAge } from '../../utils/validation';
import { signup, error, setError } from './signupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const inituser = {
  uid: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dob: moment(),
  occupation: '',
  bio: '',
  photoURL: '',
};
const SignUp = () => {
  const [hasError, setHasError] = useState(true);
  const [user, setUser] = useState(inituser);
  const _error = useSelector(error);
  const loading = useSelector((state) => state.signup.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    if (
      user.displayName.length > 0 &&
      isEmailValid(user.email) &&
      isPasswordValid(user.password) &&
      isAge(user.dob) &&
      user.photoURL.length > 0
    ) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [user]);
  const uploadImage = (image) => {
    setUserDpUrl(image);
  };
  const handleSubmit = () => {
    dispatch(signup(user));
    clear();
  };
  const setUserDpUrl = (url) => {
    setUser({ ...user, photoURL: url });
  };
  const clear = () => {
    setUser(inituser);
    form.resetFields();
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleDb = (val) => {
    setUser({ ...user, dob: val });
  };
  return (
    <div className='flex-grow flex flex-col'>
      <div className='flex-grow flex flex-col m-0'>
        <div className='flex-grow grid sm:grid-flow-row lg:grid-cols-2'>
          <div className='flex lg:flex-col justify-center items-center p-4 my-auto border-b-8 lg:border-b-0 border-primary'>
            <div className='w-full'>
              <img
                src='assets/logo.png'
                alt='logo satya sandesh'
                className='w-56 md:w-64'
              />
            </div>
            <div>
              <p className='font-bold text-lg md:text-2xl md:text-4xl'>
                सदा सत्य टेकाैं,सदा सत्य लेखाैं ...
              </p>
              <p className='font-bold lg:text-lg text-primary'>
                हरेक रचनात्मक नेपालीको लागि आवाज
              </p>
            </div>
            <div className='w-full hidden lg:flex justify-end border-b-4 py-2 border-primary'>
              <img
                src='assets/createuser.svg'
                alt='create user'
                className='w-56 md:w-64'
              />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center p-4'>
            <div className='lg:shadow-lg p-6 bg-white lg:border-t-4 max-w-sm w-full border-primary'>
              <Spin size='large' spinning={loading}>
                <div className='flex items-center'>
                  <Tooltip title='Back to homepage' placement='left'>
                    <Button
                      type='primary'
                      shape='circle'
                      icon={<LeftOutlined />}
                      onClick={() => history.push('/')}
                      style={{ marginLeft: '8px' }}
                    />
                  </Tooltip>
                  <p className='font-bolder text-xl py-4 pl-2'>Create Account</p>
                </div>
                {_error !== '' && (
                  <div className='py-4'>
                    <Alert
                      message='Error'
                      description={_error}
                      type='error'
                      showIcon
                    />
                  </div>
                )}
                <Form
                  form={form}
                  layout='horizontal'
                  size='default'
                  onFinish={handleSubmit}
                  onClick={() => dispatch(setError(''))}
                >
                  <Form.Item
                    name='displayName'
                    hasFeedback
                    validateStatus={user.displayName.length > 0 && 'success'}
                  >
                    <Input
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Full Name'
                      value={user.displayName}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name='email'
                    hasFeedback
                    validateStatus={isEmailValid(user.email) && 'success'}
                  >
                    <Input
                      prefix={<MailOutlined className='site-form-item-icon' />}
                      placeholder='Email Address'
                      value={user.email}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    hasFeedback
                    validateStatus={isPasswordValid(user.password) && 'success'}
                    help={
                      !isPasswordValid(user.password) &&
                      'Password must be a minimum of 7 characters.'
                    }
                  >
                    <Input.Password
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      placeholder='Password'
                      value={user.password}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name='confirmPassword'
                    hasFeedback
                    validateStatus={
                      isPasswordValid(user.password) &&
                      user.password === user.confirmPassword &&
                      'success'
                    }
                  >
                    <Input.Password
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      placeholder='Confirm Password'
                      value={user.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name='dob'
                    hasFeedback
                    validateStatus={isAge(user.dob) && 'success'}
                    help={!isAge(user.dob) && 'You must be 18 years of age'}
                  >
                    <DatePicker
                      placeholder='Date of Birth'
                      value={user.dob}
                      format={'MM/DD/YYYY'}
                      onChange={handleDb}
                    />
                  </Form.Item>
                  <Form.Item name='occupation'>
                    <Input
                      prefix={
                        <IdcardOutlined className='site-form-item-icon' />
                      }
                      placeholder='Occupation (optional)'
                      value={user.occupation}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item name='bio'>
                    <Input.TextArea
                      placeholder='Bio (optional)'
                      value={user.bio}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item name='photoURL'>
                    <div className='flex'>
                      <Upload
                        handleUpload={uploadImage}
                        url={user.photoURL}
                        text={'Upload Profile Picture'}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      disabled={hasError}
                    >
                      Submit
                    </Button>
                    <Button
                      type='primary'
                      htmlType='reset'
                      onClick={clear}
                      style={{ marginLeft: '5px' }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Form>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
