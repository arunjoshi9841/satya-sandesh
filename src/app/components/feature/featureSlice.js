import { createSlice } from '@reduxjs/toolkit';
import instance from '../../../api';
import { message } from 'antd';

export const featureSlice = createSlice({
  name: 'feature',
  initialState: {
    headlines: [],
    published: [],
    error: '',
    isLoading: false,
  },
  reducers: {
    setHeadlines: (state, action) => {
      state.headlines = action.payload;
    },
    setFeatured: (state, action)=>{
        state.featured = action.payload;
    },
    addHeadline: (state, action) => {
      let existingArticle = state.headlines.find(
        (el) => el.articleId === action.payload.articleId
      );
      if (!existingArticle) {
        state.headlines = [...state.headlines, action.payload];
      }
    },
    setPublished: (state, action) => {
      state.published = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const getHeadlines = () => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .get(`/api/articles/headlines`)
    .then((response) => {
      dispatch(setHeadlines(response.data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      console.log(e);
    });
};
export const featureArticle = (id) => async (dispatch)=>{
  instance.put(`/api/articles/feature?articleId=${id}`).then((response)=>{
    dispatch(getPublishedArticles());    
    message.success('Successfully updated feature status');
  }).catch((error)=>{    
    message.error('Feature status update failed');
  })
}
export const getPublishedArticles = () => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .get(`/api/articles/publish`)
    .then((response) => {
      dispatch(setPublished(response.data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      console.log(e);
    });
};
export const handleHeadlines = (data) => async (dispatch) => {
  if (data.length > 4) {
    data = data.slice(0, 4);
  }
  let requestBody = [];
  data.forEach((el) => {
    requestBody.push(el.articleId);
  });
  instance
    .post(`/api/articles/headlines`, requestBody)
    .then((response) => {
      dispatch(getHeadlines(response.data));
      dispatch(setLoading(false));
      message.success('Successfully updated headlines');
    })
    .catch((e) => {
      dispatch(setLoading(false));
      message.error(e.message ? e.message : 'Could not update headlines');
      console.log(e);
    });
};

export const {
  setHeadlines,
  setError,
  setLoading,
  setPublished,
  addHeadline,
  setFeatured,
} = featureSlice.actions;
export default featureSlice.reducer;
