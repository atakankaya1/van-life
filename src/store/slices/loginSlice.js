import { createSlice } from '@reduxjs/toolkit';
import { login } from "../thunks/fetchLogin"

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    name: "",
    id: "",
    loggedIn: false,
    error: null,
    pen: false
  },
  reducers: {
    logoutUser: (state) => {
      state.loggedIn = false;
      state.name = "";
      state.id = "";
    },
  }, 
  extraReducers(builder){
    builder.addCase(login.pending, (state, action) => {
        state.isLoading = true
        state.pen = true
        state.error = null
    })
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("action: ", action)
        state.isLoading = false
        state.loggedIn = true
        state.name = action.payload.user.name
        state.id = action.payload.user.id
        state.pen = false
        
    })
    builder.addCase(login.rejected, (state, action) => {
      console.log("reject:  ", action)
        state.isLoading = false
        state.error = "No user with those credentials found!"
        state.pen = false
    })
   }
});

export const { logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export const userReducer = userSlice.reducer;
