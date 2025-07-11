import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../src/features/api/rootReducer";
import { authApi } from "../../src/features/api/authApi";
import { courseApi } from "../../src/features/api/courseApi";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (dm) => dm().concat(authApi.middleware, courseApi.middleware),
});

const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
