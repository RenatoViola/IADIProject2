import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apartment } from "../models";

export interface ApartmentPage {
    apartments: Apartment[],
    currentPage: number,
    totalPages: number,
    isLastPage: boolean
}

export interface State {
    apartmentPage: ApartmentPage,
    filter: string,
    loading: boolean
}

const initialState: State = {
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
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.apartmentPage.currentPage = action.payload;
        }
    }
})

export const { setFilter, setLoading, setApartmentsPage, setCurrentPage } = slice.actions

export const loadApartments = (page: number) => (dispatch: any) => {
    dispatch(setLoading(true));
    fetch(`http://localhost:8080/apartments?page=${page}`)
        .then(response => response.json())
        .then(data => {
            dispatch(setApartmentsPage({
                apartments: data.data,
                currentPage: page,
                totalPages: data.totalPages,
                isLastPage: data.isLastPage
            }));
        });
}

export default slice.reducer