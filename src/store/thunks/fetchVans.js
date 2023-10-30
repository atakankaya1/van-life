import { createAsyncThunk } from "@reduxjs/toolkit"
//import { getVans } from '../../api';

 const loadVans = createAsyncThunk('vans/loadVans', async (id) => {
  async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}
    try {
      const response = await getVans(id);
      return response; 
    } catch (error) {
      throw error;
    }
  });

  



  export {loadVans}