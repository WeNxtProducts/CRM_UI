import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice } from './slices'

const reducer = combineReducers({
    [appSlice.reducerPath]: appSlice.reducer,
})

export const store = configureStore({
    reducer,
})

setupListeners(store.dispatch)
