import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../auth/authSlice";
import { message } from "antd";

import config from "../../../config";
let instance = axios.create({ baseURL: config.service.url });

export const singupSlice = createSlice({
  name: "signup",
  initialState: {
    error: "",
    loading: false,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const signup = (user) => async (dispatch) => {
  dispatch(setLoading(true))
  instance
    .post(`/api/users`, user)
    .then((response) => {
      if (response.data) {
        dispatch(setUser(response.data));
        message.success("user successfully signed up.");
      }
      dispatch(setLoading(false))
    })
    .catch((e) => {
      dispatch(setError(e.response ? e.response.data.message : "Connection error!!"));
      dispatch(setLoading(false))
    });
};

export const { setError, setLoading } = singupSlice.actions;
export const error = (state) => state.signup.error;
export default singupSlice.reducer;
