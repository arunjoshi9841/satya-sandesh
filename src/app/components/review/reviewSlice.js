import { createSlice } from '@reduxjs/toolkit';
import instance from '../../../api';
import { message } from 'antd';

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    articles: [],
    error: '',
    isLoading: false,
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const getArticles = () => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .get(`/api/articles/review`)
    .then((response) => {
      dispatch(setArticles(response.data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      console.log(e);
    });
};

export const handleDraft = (id) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    instance
      .put(`api/articles/draft?articleId=${id}`)
      .then((response) => {
        message.success("Article sent for review.");
        dispatch(getArticles());
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        message.error("Could not send article for review.");
        dispatch(setLoading(false));
      });
  };
  export const handlePublish = (id) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    instance
      .put(`api/articles/publish?articleId=${id}`)
      .then((response) => {
        message.success("Article published");
        dispatch(getArticles());
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        message.error("Could not publish article.");
        dispatch(setLoading(false));
      });
  };
export const { setArticles, setError, setLoading } = reviewSlice.actions;
export default reviewSlice.reducer;
