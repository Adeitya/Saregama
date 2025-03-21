import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    suggestionCache: {},
  },
  reducers: {
    addSuggestionCache: (state, action) => {
      state.suggestionCache = Object.assign(
        state.suggestionCache,
        action.payload
      );
    },
  },
});

export const { addSuggestionCache } = searchSlice.actions;
export default searchSlice.reducer;
