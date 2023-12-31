import { configureStore } from '@reduxjs/toolkit'
import {userReducer, logoutUser, loginedInUser} from './slices/loginSlice'
import {vanReducer, removeVan} from './slices/vanSlice';
import { loadVans, addVan, deleteVan, changePrice } from "./thunks/fetchVans" 
import { login } from "./thunks/fetchLogin"

const store = configureStore({
  reducer: {
    user: userReducer,
    vans: vanReducer,
  },
});

export {store, removeVan, logoutUser, loadVans, login, loginedInUser, addVan, deleteVan, changePrice}

