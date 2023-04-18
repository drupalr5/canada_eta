import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import orderSlice from './orderSlice'
const store = configureStore({
    reducer: {
        auth: authSlice,
        order: orderSlice
    },
})

export default store