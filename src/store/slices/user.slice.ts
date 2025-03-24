import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type userDetails = {
	userId: any
}

const initialState: userDetails = {
	userId: '1'
}

export const userSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		setUserId(state: userDetails, action: PayloadAction<any>) {
			state.userId = action.payload
		}
	}
})

export const { setUserId } = userSlice.actions
