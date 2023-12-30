import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { State, AppDispatch } from '.'
import type { State as UserState } from './user'
import type { State as ApartmentsState } from './apartments'
import type { State as ReservationsState } from './reservations'


// Typed versions of useDispatch and useSelector hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<State> = useSelector


export const useUserSelector: TypedUseSelectorHook<UserState> = 
    <T>(f:(state:UserState) => T) => useAppSelector((state:State) => f(state.user))
export const useApartmentsSelector: TypedUseSelectorHook<ApartmentsState> =
    <T>(f:(state:ApartmentsState) => T) => useAppSelector((state:State) => f(state.apartments))
export const useReservationsSelector: TypedUseSelectorHook<ReservationsState> =
    <T>(f:(state:ReservationsState) => T) => useAppSelector((state:State) => f(state.reservations))