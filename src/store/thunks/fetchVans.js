import { createAsyncThunk } from "@reduxjs/toolkit"
import { getVans, postVan, delVan } from '../../api';

 const loadVans = createAsyncThunk('vans/loadVans', async (id) => {
    try {
      const response = await getVans(id);
      return response; 
    } catch (error) {
      throw error;
    }
  });

  const addVan = createAsyncThunk('vans/postVan', async (data) => {
    try {
      const response = postVan(data);
      return response; 
    } catch (error) {
      throw error;
    }
  });

  const deleteVan = createAsyncThunk('vans/delVan', async (vanId) => {
    try {
      const response = delVan(vanId);
      return response; 
    } catch (error) {
      throw error;
    }
  });

 
  export {addVan, loadVans, deleteVan}