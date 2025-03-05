/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnqId, type EnquiryGetId, type EnquiryList } from '@/services/enquiry.services'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	return action.type === HYDRATE
}

export const enquiryApi = createApi({
	reducerPath: 'enquiry',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/enquiry'
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		getEnquiryList: build.query<EnquiryList, void>({
			query: (): {
				url: string
				method: string
				headers: { Authorization: string }
			} => ({
				url: 'enquiryList',
				method: 'GET',
				headers: { Authorization: `Bearer sampleToken` }
			})
		}),
		getByEnquiryId: build.query<EnquiryGetId, EnqId>({
			query: (
				data
			): {
				url: string
				method: string
				body: EnqId
				headers: { Authorization: string }
			} => ({
				url: 'get_enquiry_by_id',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer sampleToken` }
			})
		}),
		createEnquiry: build.mutation<any, any>({
			query: (
				data
			): {
				url: string
				method: string
				body: any
				headers: { Authorization: string }
			} => ({
				url: 'create_enquiry',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer sampleToken` }
			})
		}),
	})
})

export const { useGetEnquiryListQuery, useGetByEnquiryIdQuery,
	useCreateEnquiryMutation } = enquiryApi
