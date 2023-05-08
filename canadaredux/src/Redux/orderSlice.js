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

export const orderSearchResults = createAsyncThunk(
  "/order/orderSearchResults",
  async (order) => {
    try {
      const response = await OrderService.orderSearchResults(order);
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

export const updateOrdersData = createAsyncThunk(
  "/order/deleteOrdersData",
  async ({ order_id, data }) => {
    try {
      const response = await OrderService.updateOrdersData({ order_id, data });
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

export const getDocUploadByOrderId = createAsyncThunk(
  "/order/getDocUploadByOrderId",
  async (orderId) => {
    try {
      const response = await OrderService.getDocUploadByOrderId(orderId);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const downloadDocFile = createAsyncThunk(
  "/order/downloadDocFile",
  async (file) => {
    try {
      const response = await OrderService.downloadDocFile(file);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadOrderDocument = createAsyncThunk(
  "/order/uploadOrderDocument",
  async (params) => {
    try {
      const response = await OrderService.uploadOrderDocument(params);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getEmailHistoryByOrderId = createAsyncThunk(
  "/order/getEmailHistoryByOrderId",
  async (orderId) => {
    try {
      const response = await OrderService.getEmailHistoryByOrderId(orderId);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createEmailHistoryByOrderId = createAsyncThunk(
  "/order/createEmailHistoryByOrderId",
  async (params) => {
    try {
      const response = await OrderService.createEmailHistoryByOrderId(params);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getDownloadHistoryByOrderId = createAsyncThunk(
  "/order/getDownloadHistoryByOrderId",
  async (orderId) => {
    try {
      const response = await OrderService.getDownloadHistoryByOrderId(orderId);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createDownloadHistoryByOrderId = createAsyncThunk(
  "/order/createDownloadHistoryByOrderId",
  async (params) => {
    try {
      const response = await OrderService.createDownloadHistoryByOrderId(params);
      const data = await response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const moveUploadedFile = createAsyncThunk(
  "manage/uploadDocPdf",
  async (formData) => {
    try {
      const response = await OrderService.moveUploadedFile(formData);
      const data = response?.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const sendMail = createAsyncThunk(
  "manage/sendMail",
  async () => {
    try {
      const response = await OrderService.sendMail();
      const data = response?.data;
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
    sideBarCount: {},
    showSideBar: true
  },
  reducers: {
    toggleSidebar: (state) => ({
      ...state,
      showSideBar: !state.showSideBar,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderSideBarCount.pending, (state) => {
      state.loading = true;
      state.sideBarCount = {};
    });
    builder.addCase(getOrderSideBarCount.fulfilled, (state, action) => {
      state.loading = false;
      state.sideBarCount = action?.payload.data;
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
      state.tilesCount = action?.payload.data;
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

    builder.addCase(orderSearchResults.pending, (state) => {
      state.loading = true;
      // state.orderData = [];
    });
    builder.addCase(orderSearchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action?.payload?.data;
    });
    builder.addCase(orderSearchResults.rejected, (state, action) => {
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
  }
})
export const { toggleSidebar } = OrderSlice.actions
export default OrderSlice.reducer;