import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import orderSlice from './orderSlice'
import gatewaySlice from './gatewaySlice'
import manageSlice from './manageSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        order: orderSlice,
        gateway: gatewaySlice,
        manage:manageSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false });
    },
})

export default store