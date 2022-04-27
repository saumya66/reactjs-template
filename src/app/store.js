import { configureStore} from '@reduxjs/toolkit'
import { authAPI } from '../auth/authApi'
import { userAPI } from '../user/userAPI'
import exampleReducer from './exampleReduxSlice'
import authReducer from '../auth/authSlice'

const store = configureStore({
		reducer: {
            auth : authReducer,
            [authAPI.reducerPath] : authAPI.reducer,
			[userAPI.reducerPath] : userAPI.reducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				authAPI.middleware,
				userAPI.middleware
			)
			
})


export default store
