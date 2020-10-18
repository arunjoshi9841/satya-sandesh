import { createSlice } from "@reduxjs/toolkit";
export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    showList: true,
  },
  reducers: {
    toggleShowList: (state, action) => {
        state.showList = action.payload;
      },
  },
});

export const {toggleShowList } = navigationSlice.actions;
export const showList = (state)=>state.navigation.showList;
export default navigationSlice.reducer;
