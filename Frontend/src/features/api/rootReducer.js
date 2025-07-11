import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/authSlice";
import { authApi } from "./authApi";
import { courseApi } from "./courseApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  auth: authReducer,
});

export default rootReducer;
