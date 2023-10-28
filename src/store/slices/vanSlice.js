import { createSlice } from '@reduxjs/toolkit';
import { loadVans } from "../thunks/fetchVans"

const vanSlice = createSlice({
  name: 'vans',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {
    addVan: (state, action) => {
      state.vans.push(action.payload);
    },
    removeVan: (state, action) => {
      state.vans = state.vans.filter((van) => van.id !== action.payload);
    },
  },
  extraReducers(builder){
    builder.addCase(loadVans.pending, (state, action) => {
        state.isLoading = true
        state.error = null
    })
    builder.addCase(loadVans.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
    })
    builder.addCase(loadVans.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
    })

  }
});

export const { addVan, removeVan } = vanSlice.actions;
export const selectVans = (state) => state.vans.vans;

export const vanReducer = vanSlice.reducer;
