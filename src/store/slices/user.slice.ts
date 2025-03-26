import { createSlice, type PayloadAction } from '@reduxjs/toolkit'


const initialState: any = {
	userId: '1',
	managerId: '1',
	role : 'manager'
}

export const userSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		setUserId(state: any, action: PayloadAction<any>) {
			state.userId = action.payload
		},
		setManagerId(state: any, action: PayloadAction<any>){
			state.managerId = action.payload
		},
		setRoles(state:any, action: PayloadAction<any>){
			state.role = action.payload
		}
			
	}
})

export const { setUserId, setManagerId, setRoles } = userSlice.actions
