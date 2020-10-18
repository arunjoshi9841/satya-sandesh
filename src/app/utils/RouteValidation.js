import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {toggleShowList} from "../components/navigation/navigationSlice";
const RouteValidation = ({ children }) => {
  const location = useLocation();
  const history = useHistory(); 
  const dispatch= useDispatch();   
  return <div>{children}</div>;
};

export default RouteValidation;
