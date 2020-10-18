import React from 'react';
import { Result, Button } from 'antd';
const ErrorPage = () => {
    return (
        <Result
        status="500"
        title="Something went wrong."
        subTitle="We are working really hard to fix it."
        extra={<Button type="primary" href="/">Back Home</Button>}
/>
    );
};

export default ErrorPage;