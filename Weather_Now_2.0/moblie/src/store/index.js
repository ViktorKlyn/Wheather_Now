// Store central. Respostas de requisições antigas não devem restaurar dados
// protegidos no Redux após a saída rápida.
// store/index.js — Redux store central do aplicativo
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ocorrenciasReducer from "./ocorrenciasSlice";
import contatosReducer from "./contatosSlice";
import alertasReducer from "./alertasSlice";
import authReducer, { sair } from "./authSlice";

const combinado = combineReducers({
  ocorrencias: ocorrenciasReducer,
  contatos: contatosReducer,
  alertas: alertasReducer,
  auth: authReducer,
});

function rootReducer(state, action) {
  if (action.type === sair.type) {
    // Limpa todo o estado sensível, não apenas o indicador de autenticação.
    return combinado(undefined, action);
  }
  if (
    state && !state.auth.autenticado &&
    /^(ocorrencias|contatos|alertas)\//.test(action.type)
  ) {
    // Resposta atrasada de fetch/POST/PUT/DELETE após o logout.
    return state;
  }
  return combinado(state, action);
}

export const store = configureStore({ reducer: rootReducer });
