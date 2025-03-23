import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "configSlice",
  initialState: {
    homePageFlag: false,
    showLoaderFlag: false,
  },
  reducers: {
    setHomePageFlag: (state, action) => {
      state.homePageFlag = action.payload;
    },
    setShowLoaderFlag: (state, action) => {
      state.showLoaderFlag = action.payload;
    },
  },
});

export const { setHomePageFlag, setShowLoaderFlag } = configSlice.actions;
export default configSlice.reducer;
