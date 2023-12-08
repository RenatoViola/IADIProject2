import React, { useEffect, useState } from 'react';

// interface ReservationsList {
//     startDate: string;
//     endDate: string;
//     clientName: string;
//     apartmentName: string;
//   }
  
//   const ApartmentDetails: React.FC<ReservationsList> = ({
//     startDate,
//     endDate,
//     clientName,
//     apartmentName,
//   }) => {

const ReservationsList = () => {
  
  const reservationsURL = `http://localhost:8080/reservations`;

  const columns = [
    'Name', 'ID', 'Location', 'Description', 'Amenities'
]

  useEffect(() => {
    fetch(reservationsURL)
  .then(response => alert("entrei"))
}, []);
  
    return (
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
                        {/* {Object.values(apartmentPage.apartments)?.map(prop => {
                            return row(prop);
                        })} */}

                    <tr>

                    
                    </tr>
                    </tbody>
                </table>

            </div>
    );
  };


export default ReservationsList;
