import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "../Services/OrderServices";
export const getAllSideBarCount = createAsyncThunk(
  "/order/getAllSideBarCount",
  async (params) => {
    try {
      const response = await OrderService.getOrdersList(params);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getOrderTiles = createAsyncThunk(
  "/order/getOrderTiles",
  async (order) => {
    try {
      const response = await OrderService.getOrderTiles({ order });
      // console.log(response)
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);

export const getOrdersList = createAsyncThunk(
  "/order/getOrderList",
  async (order) => {
    try {
      const response = await OrderService.getOrdersList(order);
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);

export const getOrderDetailsByOrderId = createAsyncThunk(
  "/order/getOrderDetailsByOrderId",
  async (orderId) => {
    try {
      const response = await OrderService.getOrderDetailsByOrderId(orderId);
      const data = await response.data;

      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteOrdersData = createAsyncThunk(
  "/order/deleteOrdersData",
  async (data) => {
    try {
      await OrderService.deleteOrdersData(data);
      return data.orderId;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateMultipleOrderData = createAsyncThunk(
  "/order/updateMultipleOrderData",
  async (data) => {
    try {
      await OrderService.updateMultipleOrderData(data);
      return data.orderId;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const permanentDeleteOrdersData = createAsyncThunk(
  "/order/permanentDeleteOrdersData",
  async (orderId) => {
    try {
      const response = await OrderService.permanentDeleteOrdersData(orderId);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const OrderSlice = createSlice ({
  name: "order",
  initialState: {
    loading: false,
    orderData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSideBarCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSideBarCount.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data;
    });
    builder.addCase(getAllSideBarCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getOrderTiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderTiles.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data;
    });
    builder.addCase(getOrderTiles.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getOrdersList.pending, (state) => {
      state.loading = true;
      state.orderData = [];
    });
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action?.payload?.data;
    });
    builder.addCase(getOrdersList.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getOrderDetailsByOrderId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetailsByOrderId.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data;
    });
    builder.addCase(getOrderDetailsByOrderId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteOrdersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrdersData.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data;
    });
    builder.addCase(deleteOrdersData.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateMultipleOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateMultipleOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data;
    });
    builder.addCase(updateMultipleOrderData.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(permanentDeleteOrdersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(permanentDeleteOrdersData.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action?.payload?.data;
    });
    builder.addCase(permanentDeleteOrdersData.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

export default OrderSlice.reducer;