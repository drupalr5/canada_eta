import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GatewayService from "../Services/GatewayService";

export const getGatewayList = createAsyncThunk(
  "/gateway/getGatewayList",
  async () => {
    try {
      const response = await GatewayService.gatewaySetting();
      // console.log(response)
      const data = response.data;
      return data;
    } catch (error) {
      return error.response;
    }
  }
);

// export const updateMultipleOrderData = createAsyncThunk(
//   "/order/updateMultipleOrderData",
//   async (data) => {
//     try {
//       const response = await OrderService.updateMultipleOrderData(data);
//       return response;
//     } catch (error) {
//       return error.response.data;
//     }
//   }
// );

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

    

    // builder.addCase(permanentDeleteOrdersData.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(permanentDeleteOrdersData.fulfilled, (state, action) => {
    //   state.loading = false;
    // });
    // builder.addCase(permanentDeleteOrdersData.rejected, (state, action) => {
    //   state.loading = false;
    // });
  }
})

export default GatewaySlice.reducer;