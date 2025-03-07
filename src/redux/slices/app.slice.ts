import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppDetails = {
	token: string
	enqId: any
}

const initialState: AppDetails = {
	token: '',
	enqId: ''
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
		}
	}
})

export const { setToken, setEnqId } = appSlice.actions
