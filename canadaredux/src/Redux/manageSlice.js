import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ManageService from "../Services/ManageService";

export const getUserData = createAsyncThunk(
  "manage/getUserData",
  async (id) => {
    try {
      const response = await ManageService.getUserData(id);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);

export const updateUser = createAsyncThunk(
  "manage/updateUserData",
  async ({id, values}) => {
    try {
      const response = await ManageService.updateUserData(id, values);
      const data = response?.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const ManageSlice = createSlice({
  name: "manage",
  initialState: {
    loading: false,
    error: null,
    manage: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.manage = [];
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.manage = action?.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
    });

  }
})

export default ManageSlice.reducer;