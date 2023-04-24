import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../Services/AuthService";

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (user) => {
    try {
      const response = await AuthService.login(user);
      const data = response?.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          data: JSON.stringify(data.data),
          token: data?.jwtToken,
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async (user) => {
    try {      
      const response = await AuthService.changePassword(user.userId, user.passwordParams);
      console.log(response);
      const data = response?.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: {},
    role: null,
    error: null,
    msg: null,
  },
  reducers: {
    logout: () => ({
      loading: false,
      data: {},
      role: null,
      error: null,
      msg: null,
    }),
  },
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
