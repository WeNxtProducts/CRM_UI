/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from '@reduxjs/toolkit'
import { appSlice } from './slices/app.slice'
import { userSlice } from './slices/user.slice'

export const whiteListedState = ['apps', 'users']

export const rootReducer: any = combineReducers({
	[appSlice.reducerPath]: appSlice.reducer,
	[userSlice.reducerPath]: userSlice.reducer
})
