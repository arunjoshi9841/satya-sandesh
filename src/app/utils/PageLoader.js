import React from "react";
import { Spin } from "antd";

const PageLoader = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">     
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
