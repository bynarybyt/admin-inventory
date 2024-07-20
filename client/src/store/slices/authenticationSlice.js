import { createSlice } from '@reduxjs/toolkit';
const isAuthenticated = localStorage.getItem('isAuthenticated') !== null
	? JSON.parse(localStorage.getItem('isAuthenticated'))
	: sessionStorage.getItem('isAuthenticated') !== null
	? JSON.parse(sessionStorage.getItem('isAuthenticated'))
	: false;

const user = localStorage.getItem('user') !== null
	? JSON.parse(localStorage.getItem('user'))
	: sessionStorage.getItem('user') !== null
	? JSON.parse(sessionStorage.getItem('user'))
	: null;

const initialState = {
	isAuthenticated: isAuthenticated || false,
	user: user ||   null,
};

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
			sessionStorage.setItem('user', JSON.stringify(action.payload));
			if (action.payload.isRemember) {
				localStorage.setItem('isAuthenticated', JSON.stringify(true));
				localStorage.setItem('user', JSON.stringify(action.payload));
			} else {
				localStorage.removeItem('isAuthenticated');
				localStorage.removeItem('user');
			}
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			sessionStorage.removeItem('isAuthenticated');
			sessionStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
		},
	},
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
