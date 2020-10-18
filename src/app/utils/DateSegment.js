import React from "react";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";
import { getTodaysNepaliDate } from "./dateHandler";
const DateSegment = () => {
  return (
      <div className="flex mr-4">
        <CalendarOutlined style={{fontSize: "28px"}}/>  
        
        <p className=" pl-3 text-lg font-bold">{getTodaysNepaliDate()}</p>      
      </div>
  );
};

export default DateSegment;
