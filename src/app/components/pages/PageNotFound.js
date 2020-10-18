import React from 'react';
import { Result, Button } from 'antd';
const PageNotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, Page not found."
            extra={<Button type="primary" href="/">Back Home</Button>}
  />
    );
};

export default PageNotFound;