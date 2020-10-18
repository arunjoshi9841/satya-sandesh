import {
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';
const Footer = () => {
  return (
      <div className='w-full px-4 pt-4  border-t-4 border-primary'>
        <div className='flex flex-wrap justify-between p-4'>
          <div className='h-auto'>
            <img
              src='/assets/logo.png'
              alt='logo satya sandesh'
              className='w-40 -ml-6'
            />
            <p className='text-lg font-bold mb-2'>सत्य सन्देश</p>
            <ul className='list-reset leading-normal'>
              <li>सदा सत्य टेकौ, सदा सत्य लेखौ...</li>
            </ul>
          </div>
          <div className=' h-auto sm:mt-0 mt-8'>
            <ul className='list-reset leading-normal'>
              <li>
                <MailOutlined
                  style={{
                    fontSize: '20px',
                    paddingRight: '6px',
                    paddingBottom: '5px',
                  }}
                />
                satyasandesh2020@gmail.com
              </li>
              <li>
                <PhoneOutlined
                  style={{
                    fontSize: '20px',
                    paddingRight: '6px',
                    paddingBottom: '5px',
                  }}
                />
                +977-9851131172
              </li>
              <li>
                <FacebookOutlined
                  style={{
                    fontSize: '20px',
                    paddingRight: '6px',
                    paddingBottom: '5px',
                  }}
                />
                satyasandesh2020@gmail.com
              </li>
              <li>
                <YoutubeOutlined
                  style={{
                    fontSize: '20px',
                    paddingRight: '6px',
                    paddingBottom: '5px',
                  }}
                />
                +977-9851131172
              </li>
            </ul>
          </div>
          <div className='sm:mt-0 mt-8 h-auto'>
            <p className='text-grey-darker leading-normal'>
              Mandikathar, Kathmandu, Nepal
            </p>
            <p className='text-grey-darker leading-normal'>
              &copy; 2020 satyasandesh llc.
            </p>
          </div>
        </div>
      </div>
  );
};

export default Footer;
