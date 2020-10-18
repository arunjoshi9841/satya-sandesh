import { createSlice } from "@reduxjs/toolkit";
import instance from "../../../api";
import { message } from "antd";

const initialPost = {
  articleId: -1,
  thumbnail: "",
  title: "",
  bodyText: "",
  viewCount: 0,
  labels: [],
  summary: "",
};
export const postSlice = createSlice({
  name: "post",
  initialState: {
    step: 1,
    isLoading: false,
    isSaving: false,
    error: "",
    posts: [],
    post: initialPost,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPost: (state, action) => {
      state.post = { ...state.post, ...action.payload };
    },
    setHeaderImageUrl: (state, action) => {
      state.post.thumbnail = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSaving:(state, action)=>{
      state.isSaving = !state.isSaving;
    },
    setPosts: (state, action) => {
      state.posts = action.payload?action.payload: [];
    },
    setPostView: (state, action) => {
      state.step = 0;
      state.post = initialPost;
    },
  },
});
export const handlePost = () => async (dispatch, getState) => {
  const post = getState().post.post;
  const step = getState().post.step;
  dispatch(setLoading(true));
  if (post.articleId !== -1) {
    instance
      .put(`/api/articles`, post)
      .then((response) => {
        if (response.data) {
          dispatch(setPost(response.data));
          dispatch(setStep(step + 1));
          dispatch(setLoading(false));
        }
      })
      .catch((e) => {
        dispatch(setLoading(false));
        console.log(e);
      });
  } else {
    instance
      .post(`/api/articles`, post)
      .then((response) => {
        if (response.data) {
          dispatch(setPost(response.data));
          dispatch(setStep(step + 1));
          dispatch(setLoading(false));
          message.success("Successfully created an article");
        }
      })
      .catch((e) => {
        dispatch(setLoading(false));
        message.error("Could not create an article");
      });
  }
};
export const headerImageUpdate = (img) => async (dispatch, getState) => {
  const articleId = getState().post.post.articleId;
  dispatch(setLoading(true));
  instance
    .put(`api/articles/thumbnail?articleId=${articleId}`, {image: img})
    .then((response) => {
      dispatch(setPost({thumbnail: response.data}));
      message.success("Successfully updated image. Refresh page to see changes");
      dispatch(setLoading(false));
    })
    .catch((e) => {      
      message.error("Header image could not be updated");
      console.log(e);
      dispatch(setLoading(false));
    });
};
export const getPosts = () => async (dispatch) => {  
  dispatch(setLoading(true));
  instance
    .get(`api/articles`)
    .then((response) => {
      dispatch(setPosts(response.data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      console.log(e);      
      message.error("Error retrieving articles.");
      dispatch(setLoading(false));
    });
};

export const getPost = (id) => async (dispatch) => { 
  dispatch(setLoading(true));
  instance
    .get(`api/articles?articleId=${id}`)
    .then((response) => {
      dispatch(setPost(response.data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      console.log(e);
    });
};
export const deletePost = () => async (dispatch, getState) => {
  const articleId = getState().post.post.articleId;  
  dispatch(setLoading(true));
  instance
    .delete(`api/articles?articleId=${articleId}`)
    .then((response) => {
      dispatch(setPostView());      
      message.success("Successfully deleted article");
      dispatch(setLoading(false));
    })
    .catch((e) => {
      console.log(e);
      message.error("Could not delete article");
      dispatch(setLoading(false));
    });
};
export const reviewPost = () => async (dispatch, getState) => {
  const articleId = getState().post.post.articleId;  
  dispatch(setLoading(true));
  instance
    .put(`api/articles/review?articleId=${articleId}`)
    .then((response) => {
      message.success("Article sent for review.");
      dispatch(setPostView());  
      dispatch(setLoading(false));
    })
    .catch((error) => {
      console.log(error);
      message.error("Could not send article for review.");
      dispatch(setLoading(false));
    });
};
export const handleSave=()=>async (dispatch, getState) => {  
      const post = getState().post.post;
      dispatch(setSaving());
      instance
      .put(`/api/articles`, post)
      .then((response) => {
        if (response.data) {
          dispatch(setSaving());
        }
      })
      .catch((e) => {        
        message.error("Unable to save changes");
        dispatch(setSaving());
        console.log(e);
      });
}
export const {
  setStep,
  setPost,
  setPosts,
  setSaving,  
  setHeaderImageUrl,
  setError,
  setLoading,
  setPostView,
} = postSlice.actions;
export const step = (state) => state.post.step;
export const post = (state) => state.post.post;
export const posts = (state) => state.post.posts;
export default postSlice.reducer;
