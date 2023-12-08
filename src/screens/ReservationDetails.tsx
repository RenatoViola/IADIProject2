import React, { useEffect, useState } from 'react';
import '../css/ReservationDetails.css';
import { Link } from 'react-router-dom';

const ReservationDetails = () => {
    const [client, setClient] = useState(false);
    const [checkIn, setCheckIn] = useState(false);

    useEffect(() => {

        //verificar se é client ou owner
        //verificar se é pa fazer check-in ou check-out
    
    })

  return (
    <div className='flex flex-col h-screen justify-center items-center gap-2'>
            <div className="p-6 rounded-xl w-auto h-auto bg-white shadow-lg">
                <Link to='/apartments' className='btn btn-primary'>Back</Link>
                <div className="flex flex-col gap-1">
                    
                    {/* <h1 className="my-1"><strong>Apartment name:</strong> {selectedApartment.name}</h1>
                    <h2 className="my-1"><strong>Description:</strong> {selectedApartment.description} </h2>
                    <h3 className="my-1"><strong>Amenities:</strong> {selectedApartment.amenities}</h3>
                    <h4 className="my-1"><strong>Price per night:</strong> {selectedApartment.pricePerNight}</h4>
                    <h5 className="my-1"><strong>Location:</strong> {selectedApartment.location}</h5>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    {/* {
                        role.roleUser.role == 'CLIENT' ? (
                            <button className="btn btn-primary mt-4 w-full" onClick={() => setIsOpen(true)}>
                            Book now
                    </button>
                        )
                        :
                        (<Link to={`/apartments/${selectedApartment?.id}/reservations`} className='btn btn-primary'>List of Reservations</Link>)
                    } */}
                    
                </div>
                {/* {id !== undefined && isOpen && <CalendarModal id={id} name={selectedApartment.name} closeModal={() => setIsOpen(false)}/>} */}
            </div>
        </div>
  );
};

export default ReservationDetails;