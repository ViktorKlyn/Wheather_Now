import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listarContatosApoio,
  criarContatoApoio,
  atualizarContatoApoio,
  excluirContatoApoio,
} from "../api";
import { sair } from "./authSlice";

export const fetchContatos = createAsyncThunk(
  "contatos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await listarContatosApoio();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addContato = createAsyncThunk(
  "contatos/add",
  async (dados, { rejectWithValue }) => {
    try {
      return await criarContatoApoio(dados);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editContato = createAsyncThunk(
  "contatos/edit",
  async ({ id, dados }, { rejectWithValue }) => {
    try {
      return await atualizarContatoApoio(id, dados);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeContato = createAsyncThunk(
  "contatos/remove",
  async (id, { rejectWithValue }) => {
    try {
      await excluirContatoApoio(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contatosSlice = createSlice({
  name: "contatos",
  initialState: {
    lista: [],
    carregando: false,
    erro: null,
  },
  reducers: {
    limparErroContatos(state) {
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
      .addCase(fetchContatos.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(fetchContatos.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista = action.payload;
      })
      .addCase(fetchContatos.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      })
      .addCase(addContato.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(addContato.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista.unshift(action.payload);
      })
      .addCase(addContato.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      })
      .addCase(editContato.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(editContato.fulfilled, (state, action) => {
        state.carregando = false;
        const index = state.lista.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.lista[index] = action.payload;
      })
      .addCase(editContato.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      })
      .addCase(removeContato.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(removeContato.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista = state.lista.filter((item) => item.id !== action.payload);
      })
      .addCase(removeContato.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.payload;
      });
  },
});

export const { limparErroContatos } = contatosSlice.actions;
export default contatosSlice.reducer;
