import { createSlice } from '@reduxjs/toolkit';
import { login } from "../thunks/fetchLogin"

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    name: "",
    id: "",
    loggedIn: false,
    error: null // You can define the initial state for the user here
  },
  reducers: {
    logoutUser: (state) => {
      state.loggedIn = false;
    },
  }, 
  extraReducers(builder){
    builder.addCase(login.pending, (state, action) => {
        state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.loggedIn = true
        state.name = action.payload.name
        state.id = action.payload.id
    })
    builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
    })
   }
});

export const { logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export const userReducer = userSlice.reducer;
