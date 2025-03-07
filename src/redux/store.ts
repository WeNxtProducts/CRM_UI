import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice } from './slices'
// import { authApi } from './api/authAPI'
// import { enquiryApi } from './api/enquiryApi'

const reducer = combineReducers({
    [appSlice.reducerPath]: appSlice.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    // [enquiryApi.reducerPath]: enquiryApi.reducer,
})

export const store = configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(
    //         authApi.middleware,
    //         enquiryApi.middleware
    //     )
})

setupListeners(store.dispatch)
