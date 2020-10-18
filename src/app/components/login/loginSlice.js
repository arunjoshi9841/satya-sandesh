import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoginDialog: false,
    error: "",
  },
  reducers: {
    toggleDialog: (state) => {
      state.isLoginDialog = !state.isLoginDialog;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const login = (email, password) => async (dispatch) => {
 await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
        dispatch(setError(""));
        dispatch(toggleDialog());
    })
    .catch((e) => {
      dispatch(
        setError(e.message ? e.message : "Could not process request")
      );
    });
};
export const { toggleDialog, setError } = loginSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const isDialogOpen = (state) => state.login.isLoginDialog;
export const error = (state) => state.login.error;
export default loginSlice.reducer;
