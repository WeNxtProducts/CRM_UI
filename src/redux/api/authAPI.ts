import { type LoginToken } from '@/services/auth.services'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
    return action.type === HYDRATE
}

export const authApi = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth/'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        getLogin: build.query<LoginToken, void>({
            query: (): {
                url: string
                method: string
                headers: { Authorization: string }
            } => ({
                url: 'login',
                method: 'POST',
                headers: { Authorization: `Bearer sampleToken` }
            })
        }),
    })
})

export const {
    useGetLoginQuery,
} = authApi
