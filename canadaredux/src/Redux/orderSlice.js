import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "../Services/OrderServices";
export const getOrderSideBarCount = createAsyncThunk(
  "/order/getOrderSideBarCount",
  async (param) => {
    try {
      const response = await OrderService.getOrderSidebarCount(param);
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
      const response = await OrderService.getOrderTiles(order);
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
  async ({ order_id, data }) => {
    try {
      const response = await OrderService.deleteOrdersData({ order_id, data });
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateMultipleOrderData = createAsyncThunk(
  "/order/updateMultipleOrderData",
  async (data) => {
    try {
      const response = await OrderService.updateMultipleOrderData(data);
      return response;
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

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orderData: [],
    OrderDetails: [],
    tilesCount: {},
    sideBarCount: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderSideBarCount.pending, (state) => {
      state.loading = true;
      state.sideBarCount = {};
    });
    builder.addCase(getOrderSideBarCount.fulfilled, (state, action) => {
      state.loading = false;
      state.sideBarCount = action?.payload;
    });
    builder.addCase(getOrderSideBarCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getOrderTiles.pending, (state) => {
      state.loading = true;
      state.tilesCount = {};
    });
    builder.addCase(getOrderTiles.fulfilled, (state, action) => {
      state.loading = false;
      state.tilesCount = action?.payload;
    });
    builder.addCase(getOrderTiles.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getOrdersList.pending, (state) => {
      state.loading = true;
      // state.orderData = [];
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
      state.OrderDetails = [action?.payload?.data];
    });
    builder.addCase(getOrderDetailsByOrderId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteOrdersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrdersData.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteOrdersData.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateMultipleOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateMultipleOrderData.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateMultipleOrderData.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(permanentDeleteOrdersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(permanentDeleteOrdersData.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(permanentDeleteOrdersData.rejected, (state, action) => {
      state.loading = false;
    });
  }
})

export default OrderSlice.reducer;