import React from "react";
import EditorContainer from "./EditorContainer";
import {useDispatch} from "react-redux";
import Title from "../../utils/Title";

const BodyText = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex-grow px-6">
      <Title title="लेखमा सामग्री थप्नुहोस्"/>      
      <div className="my-4">
        <EditorContainer />
      </div>
    </div>
  );
};

export default BodyText;
