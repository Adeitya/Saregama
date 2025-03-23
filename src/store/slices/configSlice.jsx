import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "configSlice",
  initialState: {
    homePageFlag: true,
    showLoaderFlag: false,
  },
  reducers: {
    setHomePageFlag: (state, action) => {
      state.homePageFlag = action.payload;
    },
    setShowLoaderFlag: (state, action) => {
      console.log("loader", action.payload);
      state.showLoaderFlag = action.payload;
    },
  },
});

export const { setHomePageFlag, setShowLoaderFlag } = configSlice.actions;
export default configSlice.reducer;
