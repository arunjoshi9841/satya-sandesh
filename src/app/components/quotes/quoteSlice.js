import { createSlice } from '@reduxjs/toolkit';
import instance from '../../../api';
import { message } from 'antd';

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: { id: -1 },
    error: '',
    isLoading: false,
  },
  reducers: {
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const getQuote = () => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .get(`/api/quotes`)
    .then((response) => {
      dispatch(setQuote(response.data));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      dispatch(setLoading(false));
      console.log(e);
    });
};
export const updateQuote = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  instance
    .put(`/api/quotes`, data)
    .then((response) => {
      if (response.data) {
        dispatch(setQuote(data));
        dispatch(setLoading(false));
        message.success('Successfully updated Quote');
      }
    })
    .catch((e) => {
      dispatch(setLoading(false));
      message.error(e.message ? e.message : 'Could not update quote');
      console.log(e);
    });
};
export const { setQuote, setError, setLoading } = quoteSlice.actions;
export default quoteSlice.reducer;
