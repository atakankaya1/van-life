import { createAsyncThunk } from "@reduxjs/toolkit"
import { getVans } from '../../api';

 const loadVans = createAsyncThunk('vans/loadVans', async (id) => {
    try {
      const response = await getVans(id);
      return response; 
    } catch (error) {
      throw error;
    }
  });

  export {loadVans}