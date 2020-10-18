import { createSlice } from "@reduxjs/toolkit";
import instance from "../../../api";
export const articleSlice = createSlice({
  name: "article",
  initialState: {
    loading: false,
    article: {
      articleId: -1,
    },
    error: false,
  },
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload?action.payload: {};
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action)=>{
      state.loading = action.payload
    }
  },
});
export const getPost = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .get(`/api/posts?id=${id}`)
    .then((response) => {
      dispatch(setArticle(response.data));
      dispatch(setLoading(false));
    })
    .catch(() => {
      dispatch(setError(true));
      dispatch(setLoading(false));
    });    
};
export const { setArticle, setError, setLoading } = articleSlice.actions;
export default articleSlice.reducer;
