import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import authSlice from "./authSlice";
import categorySlice from "./categorySlice";

// Configure Slices
const store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    category: categorySlice
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { ignoredPaths: ["some.nested.path"] },
      serializableCheck: { ignoredPaths: ["some.nested.path"] }
    })
});

export default store;
