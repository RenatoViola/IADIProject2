import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apartment, User } from "../models";
import axios from "axios";
import { RdxUserState } from "./user";

export interface ApartmentPage {
    apartments: Apartment[],
    currentPage: number,
    totalPages: number,
    isLastPage: boolean
}

export interface OwnerApartments {
    ownerUsername: string | undefined,
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

 export const loadOwnerApartments = (user: RdxUserState, page : any) => (dispatch: any) => {
     dispatch(setLoading(true));

     const headers = new Headers({
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
    });
     fetch(`http://localhost:8080/owners/${user.user?.username}/apartments?page=${page}`, { headers })
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
         .catch(error => {
            console.error('Error fetching apartments:', error);
            // handle your error here
        });
 }





export default slice.reducer