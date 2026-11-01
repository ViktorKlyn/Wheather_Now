// store/ocorrenciasSlice.js — fatia Redux para gerenciar ocorrências
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listarOcorrencias,
  criarOcorrencia,
  atualizarOcorrencia,
  excluirOcorrencia,
} from "../api";

// ── Thunks assíncronos ──────────────────────────────────────────────────────

export const fetchOcorrencias = createAsyncThunk(
  "ocorrencias/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await listarOcorrencias();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addOcorrencia = createAsyncThunk(
  "ocorrencias/add",
  async (dados, { rejectWithValue }) => {
    try {
      return await criarOcorrencia(dados);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editOcorrencia = createAsyncThunk(
  "ocorrencias/edit",
  async ({ id, dados }, { rejectWithValue }) => {
    try {
      return await atualizarOcorrencia(id, dados);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeOcorrencia = createAsyncThunk(
  "ocorrencias/remove",
  async (id, { rejectWithValue }) => {
    try {
      await excluirOcorrencia(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ── Slice ───────────────────────────────────────────────────────────────────

const ocorrenciasSlice = createSlice({
  name: "ocorrencias",
  initialState: {
    lista: [],
    carregando: false,
    erro: null,
  },
  reducers: {
    limparErro(state) {
      state.erro = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchOcorrencias.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(fetchOcorrencias.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista = action.payload;
      })
      .addCase(fetchOcorrencias.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      });

    // add
    builder
      .addCase(addOcorrencia.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(addOcorrencia.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista.unshift(action.payload);
      })
      .addCase(addOcorrencia.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      });

    // edit
    builder
      .addCase(editOcorrencia.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(editOcorrencia.fulfilled, (state, action) => {
        state.carregando = false;
        const idx = state.lista.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.lista[idx] = action.payload;
      })
      .addCase(editOcorrencia.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      });

    // remove
    builder
      .addCase(removeOcorrencia.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(removeOcorrencia.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista = state.lista.filter((o) => o.id !== action.payload);
      })
      .addCase(removeOcorrencia.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      });
  },
});

export const { limparErro } = ocorrenciasSlice.actions;
export default ocorrenciasSlice.reducer;
