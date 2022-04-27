// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
// 	status: 'idle',
//     modal: {
// 		isOpen: false,
// 		data: {
// 			payload: {
// 				id: '',
// 				email: '',
// 			},
// 		},
// 	},
// }

// export const exampleSlice = createSlice({
// 	name: 'waitlist',
// 	initialState,
// 	reducers: {
// 		openModal: (state, action) => {
// 			state.status = 'success', 
//             state.modal = {
//                 ...state.modal,
//                 isOpen: true,
//                 data: action.payload
//             }
// 		},
//         closeModal: (state) => {
//             state.status = 'success'
//             state.modal = {
//                 ...state.modal,
//                 isOpen: false,
//                 data: {
//                     payload: {
//                         id: '',
//                         email: '',
//                     },
//                 },
//             }
// 		},
// 	},
// })

// export const { openModal, closeModal } = exampleSlice.actions

// export default exampleSlice.reducer
