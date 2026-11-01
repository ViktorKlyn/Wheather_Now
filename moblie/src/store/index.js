// store/index.js — Redux store central do aplicativo
import { configureStore } from "@reduxjs/toolkit";
import ocorrenciasReducer from "./ocorrenciasSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    ocorrencias: ocorrenciasReducer,
    auth: authReducer,
  },
});
