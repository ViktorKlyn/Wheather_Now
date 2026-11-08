import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listarAlertas, criarAlerta } from "../api";
import { sair } from "./authSlice";

export const fetchAlertas = createAsyncThunk(
  "alertas/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await listarAlertas();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendAlerta = createAsyncThunk(
  "alertas/send",
  async (dados, { rejectWithValue }) => {
    try {
      return await criarAlerta(dados);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const alertasSlice = createSlice({
  name: "alertas",
  initialState: {
    lista: [],
    carregando: false,
    erro: null,
  },
  reducers: {
    limparErroAlertas(state) {
      state.erro = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sair, () => ({
        lista: [],
        carregando: false,
        erro: null,
      }))
      .addCase(fetchAlertas.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(fetchAlertas.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista = action.payload;
      })
      .addCase(fetchAlertas.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      })
      .addCase(sendAlerta.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(sendAlerta.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista.unshift(action.payload);
      })
      .addCase(sendAlerta.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      });
  },
});

export const { limparErroAlertas } = alertasSlice.actions;
export default alertasSlice.reducer;
