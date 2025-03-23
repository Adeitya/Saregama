import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";
import configReducer from "./slices/configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    config: configReducer,
  },
});

export default appStore;
