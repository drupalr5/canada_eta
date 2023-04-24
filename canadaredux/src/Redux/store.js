import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import orderSlice from './orderSlice'
import gatewaySlice from './gatewaySlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        order: orderSlice,
        gateway: gatewaySlice,
    },
})

export default store