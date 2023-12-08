import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reservation } from "../models";
import { RdxUserState } from "./user";
import axios from "axios";

export interface ClientReservations {
    clientUsername: string | undefined,
    reservations: Reservation[],
}

export interface AllReservations {
    reservations: Reservation[],
}

export interface ApartmentReservations {
    reservations: Reservation[],
}

export interface State {
    apartmentReservations: ApartmentReservations
    allReservations: AllReservations,
    clientReservations: ClientReservations,
    filter: string,
    loading: boolean
}

const initialState: State = {
    apartmentReservations: {
        reservations: []
    },
    allReservations: {
        reservations: []
    },
    clientReservations: {
        clientUsername: '',
        reservations: []
    },
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
        },
        setClientReservations: (state, action: PayloadAction<ClientReservations>) => {
            state.clientReservations = action.payload;
        },
        setAllReservations: (state, action: PayloadAction<AllReservations>) => {
            state.allReservations = action.payload;
        },
        setApartmentReservations: (state, action: PayloadAction<ApartmentReservations>) => {
            state.apartmentReservations = action.payload;
        }
    }
})

export const { setFilter, setLoading, setClientReservations, setAllReservations, setApartmentReservations } = slice.actions

export const loadClientReservations = (user: RdxUserState) => (dispatch: any) => {
    dispatch(setLoading(true));
    axios.get(`http://localhost:8080/clients/${user.user?.username}/reservations`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
}})
        .then(data => {
            dispatch(setClientReservations({
                clientUsername: user.user?.username,
                reservations: data.data}));
        })
}

export const loadAllReservations = () => (dispatch: any) => {
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/reservations`)
        .then(response => response.json())
        .then(data => {
            dispatch(setAllReservations({
                reservations: data}));
        })
}

export const loadApartmentReservations = (apartmentId : any) => (dispatch: any) => {
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/apartments/${apartmentId}/reservations`)
        .then(response => response.json())
        .then(data => {
            dispatch(setApartmentReservations({
                reservations: data}));
        })
}


export default slice.reducer