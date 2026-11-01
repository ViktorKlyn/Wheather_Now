// store/authSlice.js — fatia Redux para autenticação via PIN
import { createSlice } from "@reduxjs/toolkit";

const PIN_CORRETO = "1234";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    autenticado: false,
    tentativas: 0,
    erro: null,
  },
  reducers: {
    validarPin(state, action) {
      const pin = action.payload;
      if (pin === PIN_CORRETO) {
        state.autenticado = true;
        state.tentativas = 0;
        state.erro = null;
      } else {
        state.tentativas += 1;
        state.erro = "PIN incorreto. Tente novamente.";
      }
    },
    sair(state) {
      state.autenticado = false;
      state.tentativas = 0;
      state.erro = null;
    },
    limparErroAuth(state) {
      state.erro = null;
    },
  },
});

export const { validarPin, sair, limparErroAuth } = authSlice.actions;
export default authSlice.reducer;
