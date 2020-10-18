import { createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app';
import history from "../../utils/history";
import { message } from "antd";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: {
      displayName: "",
      photoURL:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    isLoading: true,
    role: "guest",
  },
  reducers: {
    unAuthorize: (state) => {
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      if(action.payload){
        state.user = { ...state.user, ...action.payload };
        state.isLoggedIn = true; 
      }else{
        state.isLoggedIn = false;
        state.role= "guest";
      }      
      state.isLoading = false;
    },
  },
});
export const logout = () => async (dispatch) => {
  firebase.auth().signOut().then(()=>{
    history.push("/");
  }).catch((e)=>{
    message.error("Could not log out user");
  })
};
export const { unAuthorize, setUser } = authSlice.actions;
export const user = (state) => state.auth.user;
export const isLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
