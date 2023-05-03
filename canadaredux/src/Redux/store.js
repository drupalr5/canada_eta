import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import gatewaySlice from "./gatewaySlice";
import manageSlice from "./manageSlice";
// import remarkSlice from './remarkSlice'
import countrySlice from "./countrySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice,
    gateway: gatewaySlice,
    manage: manageSlice,
    country: countrySlice,
    // remarks: remarkSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
