// store/index.js — Redux store central do aplicativo
import { configureStore } from "@reduxjs/toolkit";
import ocorrenciasReducer from "./ocorrenciasSlice";
import contatosReducer from "./contatosSlice";
import alertasReducer from "./alertasSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    ocorrencias: ocorrenciasReducer,
    contatos: contatosReducer,
    alertas: alertasReducer,
    auth: authReducer,
  },
});
