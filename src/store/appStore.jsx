import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export default appStore;
