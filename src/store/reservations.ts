import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reservation } from "../models";

export interface State {
    filter: string,
    loading: boolean
}

const initialState: State = {
    filter: '',
    loading: false
}

export const slice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { setFilter, setLoading} = slice.actions

export const loadReservations = () => (dispatch: any) => {
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/reservations`)
        .then(response => alert("deu certo"))
}

export default slice.reducer