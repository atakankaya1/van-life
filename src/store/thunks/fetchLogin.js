import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser } from '../../api';

 const login = createAsyncThunk('login/loginAsync', async (creds) => {
    try {
      const user = await loginUser(creds);
      return user; // Assuming your API returns an array of vans
    } catch (error) {
      throw error;
    }
  });

  export {login}