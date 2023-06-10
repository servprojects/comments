import { configureStore } from "@reduxjs/toolkit";
import reducer from "store/slices";
import { basePersistentApi } from "./baseApi";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          "payload.proceedCallback",
          "payload.cancelCallback",
          "payload",
        ],
        ignoredPaths: [
          "processModal.proceedCallback",
          "processModal.cancelCallback",
          "basePersistentApi",
        ],
      },
    }).concat(basePersistentApi.middleware),
});

if (module.hot) {
  module.hot.accept("store/slices", () => {
    const reducers = require("store/slices").default;

    store.replaceReducers(reducers);
  });
}

export default store;
