import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface RdxUserState {
    username: string | undefined,
    token: string | undefined
}

export type State = RdxUserState

// Define the initial state using that type
const initialState: State = {
    username: undefined,
    token: undefined
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
            state.token = action.payload;
        }
    }
})

export const { setUser } = slice.actions

export default slice.reducer