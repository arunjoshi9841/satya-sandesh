import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { post } from "./postSlice";
import Title from "../../utils/Title";
import Article from "../article/Article";

const Review = () => {
  const dispatch = useDispatch();
  const _post = useSelector(post);
  return (
    <div className="flex-grow px-6">
      <Title
        title="लेख समीक्षा गर्नुहोस्"
      />
      <Article post={_post}/>
    </div>
  );
};

export default Review;
