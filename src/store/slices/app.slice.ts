/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppDetails = {
    token: string
    enqId: any
    lead: any

}

const initialState: AppDetails = {
    token: '',
    enqId: '',
    lead: null,

}

export const appSlice = createSlice({
    name: 'apps',
    initialState: initialState,
    reducers: {
        setToken(state: AppDetails, action: PayloadAction<any>) {
            state.token = action.payload
        },
        setEnqId(state: AppDetails, action: PayloadAction<any>) {
            state.enqId = action.payload
        },
        setLead(state: AppDetails, action: PayloadAction<any>) {
            state.lead = action.payload
        },

    }
})

export const { setToken, setEnqId, setLead } = appSlice.actions
