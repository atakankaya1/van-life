import { configureStore } from '@reduxjs/toolkit';
import {userReducer, logoutUser, loginedInUser} from './slices/loginSlice';
import {vanReducer, addVan, removeVan} from './slices/vanSlice';
import { loadVans } from "./thunks/fetchVans" 
import { login } from "./thunks/fetchLogin"

const store = configureStore({
  reducer: {
    user: userReducer,
    vans: vanReducer,
  },
});

export {store, addVan, removeVan, logoutUser, loadVans, login, loginedInUser};

