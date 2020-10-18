import { Spin, Tabs } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../utils/Title';
import Featured from './Featured';
import Headlines from './Headlines';
import ImportArticles from './ImportArticles';
const { TabPane } = Tabs;
const Feature = () => {
  const [addView, setAddView] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const loading = useSelector((state) => state.feature.isLoading);
  return (
    <Spin tip='Loading...' size='large' spinning={loading}>
      <div className='mb-4'>
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
          <TabPane tab='Headlines' key='1'>
            <div className='flex-grow flex flex-col pt-4'>
              <Title title='Headline Articles' />
              <Headlines
                handleImport={() => setAddView(!addView)}
                isImportOpen={addView}
              />
            </div>
            {addView && <ImportArticles/>}
          </TabPane>
          <TabPane tab='Featured' key='2'>
            <div className='flex-grow flex flex-col pt-4'>
              <Title title='Feature Articles' />
              <Featured/>
            </div>
          </TabPane>
        </Tabs>        
      </div>
    </Spin>
  );
};

export default Feature;
