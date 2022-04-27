import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const exampleAPI = createApi({
	reducerPath: 'exampleAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'baseUrl',
	}),
	endpoints: (builder) => ({
		examplePostReq: builder.mutation({
			query: (user) => ({
				url: 'newwaitlist',
				method: 'POST',
				body: user,
			}),
		}),
	}),
})

export const {
	examplePostReq,
} = exampleAPI
