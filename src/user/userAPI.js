import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../app/api'

export const userAPI = createApi({
	baseQuery: axiosBaseQuery(),
	reducerPath: 'userAPI',
	endpoints: (builder) => ({
		getUser: builder.mutation({
			query: () => ({
				url: '/v1/user',
				method: 'GET',
			}),
		}),
	}),
})

export const {
	useGetUserMutation 
} = userAPI
