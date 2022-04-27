import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../app/api'
 
export const authAPI = createApi({
	baseQuery: axiosBaseQuery(),
	reducerPath: 'authAPI',
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (user) => ({
				url: '/v1/auth/register',
				method: 'POST',
				data: user,
			}),
			// transformResponse: (response) => response.data
		}),
        loginUser: builder.mutation({
			query: (user) => ({
				url: '/v1/auth/login',
				method: 'POST',
				data: user,
			}),
		}),
		getAccessToken: builder.mutation({
			query: (refreshToken) => ({
				url: '/v1/auth/refresh-token',
				method: 'POST',
				data: {refreshToken},
			}),
		}),
        logoutUser: builder.mutation({
			query: (refreshToken) => ({
				url: '/v1/auth/logout',
				method: 'POST',
				data: {refreshToken},
			}),
		}),
	}),
})

export const {
	useRegisterUserMutation,useLoginUserMutation, useGetAccessTokenMutation, useLogoutUserMutation
} = authAPI
