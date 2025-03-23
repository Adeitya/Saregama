import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchReducer from "./slices/searchSlice";
import configReducer from "./slices/configSlice";
import gptReducer from "./slices/gptSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    config: configReducer,
    gpt: gptReducer,
  },
});

export default appStore;
