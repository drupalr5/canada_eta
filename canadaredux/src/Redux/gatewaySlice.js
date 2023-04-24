import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GatewayService from "../Services/GatewayService";

export const getGatewayList = createAsyncThunk(
  "gateway/getGatewayList",
  async () => {
    try {
      const response = await GatewayService.gatewaySetting();
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);

export const updateGatewayData = createAsyncThunk(
  "admin/updateGatewayData",
  async (values) => {
    try {
      const response = await GatewayService.updateGatewaySetting(values);
      const data = response?.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const GatewaySlice = createSlice({
  name: "gateway",
  initialState: {
    loading: false,
    error: null,
    gateway: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGatewayList.pending, (state) => {
      state.loading = true;
      state.gateway = [];
    });
    builder.addCase(getGatewayList.fulfilled, (state, action) => {
      state.loading = false;
      state.gateway = action?.payload;
    });
    builder.addCase(getGatewayList.rejected, (state, action) => {
      state.loading = false;
    });

  }
})

export default GatewaySlice.reducer;