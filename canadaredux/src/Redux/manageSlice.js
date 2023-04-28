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

export const getUser = createAsyncThunk(
  "manage/getUser",
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
  async ({ id, values }) => {
    try {
      const response = await ManageService.updateUserData(id, values);
      const data = response?.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadUserImage = createAsyncThunk(
  "manage/uploadUserImage",
  async (formData) => {
    try {
      const response = await ManageService.uploadUserImage(formData);
      const data = response?.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getUsersList = createAsyncThunk(
  "manage/getUsersList",
  async (params) => {
    try {
      const response = await ManageService.getUsersList(params);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);
export const deleteUserData = createAsyncThunk(
  "manage/deleteUserData",
  async (params) => {
    try {
      const response = await ManageService.deleteUserData(params);
      console.log(response);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);
export const getTeamMembers = createAsyncThunk(
  "/order/getTeamMembers",
  async (param) => {
    try {
      const response = await ManageService.getTeamMembers(param);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);
const ManageSlice = createSlice({
  name: "manage",
  initialState: {
    loading: false,
    error: null,
    manage: [],
    list: [],
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
    builder.addCase(getUsersList.pending, (state) => {
      state.loading = true;
      state.manage = [];
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action?.payload;
    });
    builder.addCase(getUsersList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getTeamMembers.pending, (state) => {
      state.loading = true;
      state.manage = [];
    });
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action?.payload;
    });
    builder.addCase(getTeamMembers.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default ManageSlice.reducer;
