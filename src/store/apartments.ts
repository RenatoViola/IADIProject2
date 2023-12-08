import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apartment } from "../models";
import axios from "axios";

export interface ApartmentPage {
    apartments: Apartment[],
    currentPage: number,
    totalPages: number,
    isLastPage: boolean
}

export interface OwnerApartments {
    ownerUsername: string | null,
    apartments: Apartment[],
}

export interface State {
    apartments: OwnerApartments,
    apartmentPage: ApartmentPage,
    filter: string,
    loading: boolean
}

const initialState: State = {
    apartments: {
        ownerUsername: "",
        apartments: []
    },
    apartmentPage: {
        apartments: [],
        currentPage: 0,
        totalPages: 0,
        isLastPage: false
    },
    filter: '',
    loading: false
}

export const slice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setApartmentsPage: (state, action: PayloadAction<ApartmentPage>) => {
            state.apartmentPage = action.payload;
            state.loading = false;
        },
        setOwnerApartments: (state, action: PayloadAction<OwnerApartments>) => {
            state.apartments = action.payload;
            state.loading = false;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.apartmentPage.currentPage = action.payload;
        }
    }
})

export const { setFilter, setLoading, setApartmentsPage, setOwnerApartments, setCurrentPage } = slice.actions

export const loadApartments = (page: number) => (dispatch: any) => {
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/apartments?page=${page}`)
        .then(response => response.json())
        .then(data => {
            console.log("+++++++1++++++" + data)
            dispatch(setApartmentsPage({
                apartments: data.data,
                currentPage: page,
                totalPages: data.totalPages,
                isLastPage: data.isLastPage
            }));
        })
}

export const loadOwnerApartments = (ownerUsername: string | null) => (dispatch: any) => {
    dispatch(setLoading(true));

    fetch(`http://localhost:8080/owners/${ownerUsername}/apartments`)
        .then(response => response.json())
        .then(data => { console.log("+++++++2++++++" + data)
            dispatch(setOwnerApartments({
                apartments: data,
                ownerUsername: ownerUsername
            }));
        })
}



export default slice.reducer