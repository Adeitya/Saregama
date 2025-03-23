import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSlice",
  initialState: {
    gptScreenFlag: false,
    gptShowLoading: false,
    gptTrackNames: null,
    gptTrackResults: null,
  },
  reducers: {
    setGptScreenFlag: (state, action) => {
      state.gptScreenFlag = action.payload;
    },
    toggleGptShowLoading: (state) => {
      state.gptShowLoading = true;
    },
    addGptTrackResult: (state, action) => {
      const { trackNames, trackDetailsList } = action.payload;
      state.gptTrackNames = trackNames;
      state.gptTrackResults = trackDetailsList;
      state.gptShowLoading = false;
    },
  },
});

export const { setGptScreenFlag, toggleGptShowLoading, addGptTrackResult } =
  gptSlice.actions;
export default gptSlice.reducer;
