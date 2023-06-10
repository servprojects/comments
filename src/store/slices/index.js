import { combineReducers } from "@reduxjs/toolkit";

import viewReducer, { name as viewName } from "store/slices/view";
import commentReducer, { name as commentName } from "store/slices/comment";
import { basePersistentApi } from "../baseApi";

const rootReducer = combineReducers({
  [viewName]: viewReducer,
  [commentName]: commentReducer,
  [basePersistentApi.reducerPath]: basePersistentApi.reducer,
});

export default rootReducer;
