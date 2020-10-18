import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase, { auth } from 'firebase';
import { setUser } from './authSlice';
import PageLoader from '../../utils/PageLoader';
const Authorized = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((authUser) => {
      if(authUser){
        var user = authUser.toJSON();
        firebase.auth().currentUser.getIdTokenResult().then((tokenresult)=>{
          let role = tokenresult.claims.role;
          dispatch(setUser({...user, ...{role: role}}));
        }).catch(()=>{
          dispatch(setUser({...user, ...{role: 'user'}}));
        })
      }else{
        dispatch(setUser())
      }
    });
    return () => {
      unlisten();
  }
  },[]);
  return isLoading ? <PageLoader /> : children;
};

export default Authorized;
