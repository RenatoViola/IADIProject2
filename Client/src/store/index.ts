import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger'
import userReducer from './user';
import apartmentReducer from './apartments';
import reservationReducer from './reservations';


export const store = configureStore({
    reducer: {
        apartments: apartmentReducer,
        user: userReducer,
        reservations: reservationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch