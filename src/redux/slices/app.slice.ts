import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppDetails = {
    token: string
}

const initialState: AppDetails = {
    token: '',
}

export const appSlice = createSlice({
    name: 'apps',
    initialState: initialState,
    reducers: {
        setToken(state: AppDetails, action: PayloadAction<string>) {
            state.token = action.payload
        },
    }
})

export const { setToken } = appSlice.actions