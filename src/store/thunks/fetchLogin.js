import { createAsyncThunk } from "@reduxjs/toolkit"

 const login = createAsyncThunk('login/loginAsync', async (creds) => {
  async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
    try {
      const user = await loginUser(creds)
      console.log(user)
      return user
    } catch (error) {
      
      throw error
    }
  });

  export {login}