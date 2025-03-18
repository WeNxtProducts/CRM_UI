/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from '@reduxjs/toolkit';
import { appSlice } from '@/redux/slices';

export const whiteListedState = ['apps']

export const rootReducer: any = combineReducers({
    [appSlice.reducerPath]: appSlice.reducer,
});