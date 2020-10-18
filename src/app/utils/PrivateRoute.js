import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import DashNav from "./DashNav";
// A wrapper for <Route> that redirects to the home page
// screen if you're not yet authenticated or if auth is not
// yet loaded
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoading && isLoggedIn ? (
          <>
          <DashNav/>
          <Component {...props} /></>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};
export default PrivateRoute;
