import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger'
import userReducer, { setUser } from './user';
import apartmentReducer, { loadApartments } from './apartments';

export const store = configureStore({
    reducer: {
        apartments: apartmentReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export type State = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.dispatch(setUser("John Doe"))