import { Card, Skeleton } from "antd";
import React from "react";
const LoadingComponent = () => {
  return (
    <div>
      <div className="flex-grow pl-0 sm:pl-4 flex flex-col my-8">
        <div className="w-full grid sm:grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
          {[1, 2, 3, 4].map((post, index) => (
            <Card
              style={{
                maxWidth: 280,
                margin: "4px",
                border: "none",
                backgroundColor: "transparent",
              }}
              cover={
                <img
                  alt="example"
                  src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
                  width="auto"
                  height="240p"
                />
              }
              hoverable
              key={index}
            >
              <Skeleton
                title
                paragraph={{ rows: 4 }}
              ></Skeleton>
            </Card>
          ))}
        </div>
      </div>
      <div className="my-8 mx-4 sm:mx-0">
        <Skeleton
          title
          paragraph={{ rows: 4, width: "180px" }}
        />
      </div>
      <div className="my-8 mx-4 sm:mx-0">
        <Skeleton
          title
          paragraph={{ rows: 4, width: "180px" }}
        />
      </div>
    </div>
  );
};

export default LoadingComponent;
