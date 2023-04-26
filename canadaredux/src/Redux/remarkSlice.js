import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RemarkServices from "../Services/RemarkServices";

export const getOrderRemarksByOrderId = createAsyncThunk(
  "/order/getOrderRemarksByOrderId",
  async (orderId) => {
    try {
      const response = await RemarkServices.getOrderRemarksByOrderId(orderId);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createOrderRemarksByOrderId = createAsyncThunk(
  "/order/createOrderRemarksByOrderId",
  async (params) => {
    try {
      const response = await RemarkServices.createOrderRemarksByOrderId(params);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const RemarkSlice = createSlice({
  name: "remarks",
  initialState: {
    loading: false,    
    OrderRemarks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderRemarksByOrderId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrderRemarksByOrderId.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createOrderRemarksByOrderId.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getOrderRemarksByOrderId.pending, (state) => {
      state.loading = true;
      state.OrderRemarks = [];
    });
    builder.addCase(getOrderRemarksByOrderId.fulfilled, (state, action) => {
      state.loading = false;
      state.OrderRemarks = action?.payload.data;
    });
    builder.addCase(getOrderRemarksByOrderId.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

export default RemarkSlice.reducer;