import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RdxUserState {
    username: string | null,
    token: string | null,
    isAuthenticated: boolean,
    role: string | null
}

export type State = RdxUserState

const initialState: State = {
    username: null,
    token: null,
    isAuthenticated: false,
    role: null
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<RdxUserState>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.username = null;
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    }
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer