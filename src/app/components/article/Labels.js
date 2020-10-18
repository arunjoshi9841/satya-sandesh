import React from 'react';
import {Tag } from "antd";
import {useSelector} from "react-redux";
const Labels = ({tags}) => {
    const _labels = useSelector((state)=>state.label.labels);
    const getColor = (labelId)=>{
       const _label = _labels.find((el)=>el.labelId===labelId);
       return _label.color
    }
    const getName = (labelId)=>{
        const _label = _labels.find((el)=>el.labelId===labelId);
        return _label.name
     }
    return (
        _labels.length>0&&<div className="flex flex-wrap mx-4">
            {
                tags.map((label, index)=><Tag color={getColor(label)} key={index}>{getName(label)}</Tag>)
            }
        </div>
    );
};

export default Labels;