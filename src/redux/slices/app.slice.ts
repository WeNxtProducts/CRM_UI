import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppDetails = {
	token: string
	enqId: any
	leadId: any
}

const initialState: AppDetails = {
	token: '',
	enqId: '',	
	leadId:''
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
		setLeadId(state: AppDetails, action: PayloadAction<any>) {
			state.leadId = action.payload
		}
	}
})	

export const { setToken, setEnqId, setLeadId } = appSlice.actions
