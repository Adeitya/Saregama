import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userDetails: null,
  },
  reducers: {
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    resetUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { addUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
