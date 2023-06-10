import { combineReducers } from "@reduxjs/toolkit";

import viewReducer, { name as viewName } from "store/slices/view";
import { basePersistentApi } from "../baseApi";

const rootReducer = combineReducers({
  [viewName]: viewReducer,
  [basePersistentApi.reducerPath]: basePersistentApi.reducer,
});

export default rootReducer;
