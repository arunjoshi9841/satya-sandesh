import { createSlice } from '@reduxjs/toolkit';
import instance from '../../../api';
import { message } from 'antd';

export const labelSlice = createSlice({
  name: 'label',
  initialState: {
    labels: [],
    error: '',
    isLoading: false,
  },
  reducers: {
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const getLabels = () => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .get(`/api/labels`)
    .then((response) => {
      if (response.data) {
        dispatch(setLabels(response.data));
        dispatch(setLoading(false));
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));
      console.log(e);
    });
};
export const deleteLabel = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .delete(`/api/labels?labelId=${id}`)
    .then((response) => {
      dispatch(getLabels()); 
      message.success('Successfully deleted label');
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      message.success('Could not delete label');
      console.log(e);
    });
};
export const handleLabel = (label) => async (dispatch) => {
  dispatch(setLoading(true));
  if (label.labelId !== -1) {
    instance
      .put(`/api/labels`, label)
      .then((response) => {
        if (response.data) {
          dispatch(getLabels());
          dispatch(setLoading(false));
          message.success('Successfully updated label');
        }
      })
      .catch((e) => {
        dispatch(setLoading(false));
        message.error(e.message ? e.message : 'Could not update label');
        console.log(e);
      });
  } else {
    instance
      .post(`/api/labels`, label)
      .then((response) => {
        if (response.data) {
          dispatch(getLabels());
          dispatch(setLoading(false));
          message.success('Successfully created a label');
        }
      })
      .catch((e) => {
        dispatch(setLoading(false));
        message.error(e.message ? e.message : 'Could not create label');
      });
  }
};
export const { setLabels, setError, setLoading } = labelSlice.actions;
export default labelSlice.reducer;
