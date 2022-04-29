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
		registerGoogleUser: builder.mutation({
			query: (token) => ({
				url: '/v1/auth/google-register',
				method: 'POST',
				data: {token},
			}),
		}),
		loginGoogleUser: builder.mutation({
			query: (token) => ({
				url: '/v1/auth/google-login',
				method: 'POST',
				data: {token},
			}),
		}),
	}),
})

export const {
	useRegisterUserMutation,
	useLoginUserMutation, 
	useGetAccessTokenMutation, 
	useLogoutUserMutation, 
	useLoginGoogleUserMutation,
	useRegisterGoogleUserMutation
} = authAPI
