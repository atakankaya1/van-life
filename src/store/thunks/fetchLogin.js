import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser } from '../../api';

 const login = createAsyncThunk('login/loginAsync', async (creds) => {
    try {
      const user = await loginUser(creds);
      console.log(user)
      return user;
    } catch (error) {
      
      throw error;
    }
  });

  export {login}