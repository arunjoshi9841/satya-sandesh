import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../../config';
let instance = axios.create({ baseURL: config.service.url });

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    loading: false,
    posts: {
      featured: [],
      headlines: [],
      other: [],
    },
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts.other = action.payload;
    },
    setFeatured: (state, action) => {
      state.posts.featured = action.payload;
    },
    setHeadlines: (state, action) => {
      state.posts.headlines = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const getData = () => async (dispatch) => {
  return Promise.all([
    dispatch(setLoading(true)),
    dispatch(getPosts()),
    dispatch(getFeatured()),
    dispatch(getHeadlines()),
  ])
    .then(() => dispatch(setLoading(false)))
    .catch(() => dispatch(setLoading(false)));
};
export const getPosts = () => async (dispatch) => {
  instance
    .get(`/api/posts`)
    .then((response) => {
      if (response.data) {
        dispatch(setPosts(response.data));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getFeatured = () => async (dispatch) => {
  instance
    .get(`/api/posts/featured`)
    .then((response) => {
      if (response.data) {
        dispatch(setFeatured(response.data));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getHeadlines = () => async (dispatch) => {
  instance
    .get(`/api/posts/headlines`)
    .then((response) => {
      if (response.data) {
        dispatch(setHeadlines(response.data));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
export const {
  setPosts,
  setLoading,
  setFeatured,
  setHeadlines,
} = homeSlice.actions;
export default homeSlice.reducer;
