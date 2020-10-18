import React from "react";
import Logo from "./logo";
import NavigationList from "./NavigationList";
import { Link } from "react-router-dom";
import {showList} from "./navigationSlice";
import {useSelector} from "react-redux";
import AccountNav from "./AccountNav";

const Navigation = () => {
  const _showList= useSelector(showList);
  return (
  <div className="w-full border-b-4 border-primary mb-6">      
      <div className="flex flex-grow sm:flex-wrap">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex flex-grow flex-row-reverse items-center justify-between">
          <div className="pr-4">            
          <AccountNav />
          </div>
          {/* {_showList&&<NavigationList />} */}
        </div>
      </div>    
    </div>
  );
};

export default Navigation;
