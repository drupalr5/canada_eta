import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config.json";
import AuthService from "../Services/AuthService";

export const authenticate = createAsyncThunk("auth/authenticate", async (user) => {
  try {
    // const response = await axios
    //   .get(`${config.API_URL}/admin/${user.email}/${user.password}`);
    const response = await AuthService.login(user)
    const data = response?.data;
    // console.log(response)
    localStorage.setItem("user", JSON.stringify(data.result))
    localStorage.setItem("jwtToken", data?.jwtToken)
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: {},
    role: null,
    error: null,
    msg: null,
  },
  reducers: {},
  extraReducers: {
    [authenticate.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authenticate.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [authenticate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
console.log(authSlice)
export default authSlice.reducer;
