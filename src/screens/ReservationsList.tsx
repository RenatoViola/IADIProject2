import React, { useEffect, useState } from 'react';
import { useAppDispatch, useReservationsSelector } from '../store/hooks';
import { useSelector } from 'react-redux';
import { State } from "../store/index";
import ReservationInList from '../components/ReservationInList';
import { loadAllReservations, loadApartmentReservations, loadClientReservations } from "../store/reservations";
import { useParams } from 'react-router-dom';


const ReservationsList = (role: any) => {

    const { id } = useParams()

    const dispatch = useAppDispatch()
    const allReservations = useReservationsSelector(state => state.allReservations)
    const clientReservations = useReservationsSelector(state => state.clientReservations)
    const apartmentReservations = useReservationsSelector(state => state.apartmentReservations)
    const userData = useSelector((state: State) => state.user);

    const columns = [
        'ID', 'Start_Date', 'End_Date', 'Number of people', 'Price', 'Status'
    ]

    const row = (data: any) => {
        return (
            <tr className="clickableRow">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-blue">
                    <ReservationInList reservation={data} key={data.id} />
                </th>
                <td className="px-4 py-2">{data.startDate}</td>
                <td className="px-4 py-2">{data.endDate}</td>
                <td className="px-4 py-2">{data.numberOfPeople}</td>
                <td className="px-4 py-2">{data.price}</td>
                <td className="px-4 py-2">{data.status}</td>

            </tr>
        )
    }

    useEffect(() => {
        
        if (role.roleUser.role === 'CLIENT') {
            dispatch(loadClientReservations(userData));
            
        } else if (role.roleUser.role === 'MANAGER') {
            dispatch(loadAllReservations());
            
        } else if(role.roleUser.role === 'OWNER'){
          dispatch(loadApartmentReservations(id));
          
        }
    }, []);

    return (
        <>
            {console.log(apartmentReservations + "not details")}
            <div className='flex flex-col h-screen justify-center items-center gap-2 sm:rounded-lg'>
                <table className='p-4 rounded-xl w-auto h-auto bg-white shadow-lg'>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map(c => {
                                return <th scope="col" className="p-2">{c}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {role.roleUser.role === 'CLIENT' &&
                            Object.values(clientReservations.reservations)?.map(prop => {
                                return row(prop);
                            })}
                            {role.roleUser.role === 'MANAGER' &&
                            Object.values(allReservations.reservations)?.map(prop => {
                                return row(prop);
                            })}
                            {role.roleUser.role === 'OWNER' &&
                            Object.values(apartmentReservations.reservations)?.map(prop => {
                                return row(prop);
                            })}

                        <tr>


                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    );
};


export default ReservationsList;
