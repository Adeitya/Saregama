import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    suggestionCache: {},
    searchTxt: "",
    searchData: [],
  },
  reducers: {
    addSuggestionCache: (state, action) => {
      state.suggestionCache = Object.assign(
        state.suggestionCache,
        action.payload
      );
    },
    addSearchTxt: (state, action) => {
      state.searchTxt = action.payload;
    },
    addSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { addSuggestionCache, addSearchTxt, addSearchData } =
  searchSlice.actions;
export default searchSlice.reducer;
