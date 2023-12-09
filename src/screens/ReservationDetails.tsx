import React, { useEffect, useState } from 'react';
import '../css/ReservationDetails.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../store/index';
import { Reservation } from '../models';
import axios from 'axios';


const ReservationDetails = () => {

    const { id } = useParams()

    const reservationsPageUrl = `http://localhost:8080/reservations/${id}`;
    
    const [client, setClient] = useState(false);
    const [checkIn, setCheckIn] = useState(false);
    const userData = useSelector((state: State) => state.user);
    const[selectedReservation, setSelectedReservation] = useState<Reservation | null >(null);

    useEffect(() => {
        const token = userData?.token; // Assuming the token is stored directly under userData

        const fetchOptions = {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                // Include other headers as needed
            }
        };
        fetch(reservationsPageUrl, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log("DATAAAAAAAAAAAAAAAAAAAAA")
                setSelectedReservation(data);
                console.log(data);
            });
        //verificar se é client ou owner
            if(userData.user?.role == 'CLIENT'){
                setClient(true);
            }
            else{
                setClient(false);
            }
            console.log(userData);
    }, [userData,reservationsPageUrl]);

    const checkInReservation = async () => {
        if(selectedReservation?.status != 'BOOKED'){
            alert("The status of the reservation must be BOOKED");
            
        }
        else{
           const checkInData = {
                reservationId: selectedReservation?.id,
           }
           try {
            const response = await axios.put(`http://localhost:8080/reservations/${id}/checkIn`, checkInData, {
              headers: {
                'Authorization': `Bearer ${userData.token}`,
              }
            });
            console.log('Check in successful:', response.data);
        }catch (error) {
            // Handle errors
            console.error('Error making reservation:', error);
          }
        }
    }

    const checkOutReservation = async () => {
        if(selectedReservation?.status != 'OCCUPIED'){
        alert("The status of the reservation must be OCCUPIED");
            
        }
        else{
           const checkOutData = {
                reservationId: selectedReservation?.id,
           }
           try {
            const response = await axios.put(`http://localhost:8080/reservations/${id}/checkOut`, checkOutData, {
              headers: {
                'Authorization': `Bearer ${userData.token}`,
              }
            });
            console.log('Check out successful:', response.data);
        }catch (error) {
            // Handle errors
            console.error('Error making reservation:', error);
          }
        }
    }

    const acceptReservation = async () => {
        if(selectedReservation?.status != 'UNDER_CONSIDERATION'){
            alert("The status of the reservation must be UNDER_CONSIDERATION");
        }
        else{
           const acceptData = {
                reservationId: selectedReservation?.id,
           }
           try {
            const response = await axios.put(`http://localhost:8080/reservations/${id}/confirmation`, acceptData, {
              headers: {
                'Authorization': `Bearer ${userData.token}`,
              }
            });
            console.log('Reservation accepted:', response.data);
            alert("Reservation accepted");
        }catch (error) {
            // Handle errors
            console.error('Error making reservation:', error);
            alert("It was not possible to accept the reservation");
          }
        }
    }

    const rejectReservation = async () => {
        if(selectedReservation?.status != 'UNDER_CONSIDERATION'){
            alert("The status of the reservation must be UNDER_CONSIDERATION");
        }
        else{
           const acceptData = {
                reservationId: selectedReservation?.id,
           }
           try {
            const response = await axios.put(`http://localhost:8080/reservations/${id}/rejection`, acceptData, {
              headers: {
                'Authorization': `Bearer ${userData.token}`,
              }
            });
            console.log('Reservation accepted:', response.data);
            alert("Reservation rejected");
        }catch (error) {
            // Handle errors
            console.error('Error making reservation:', error);
            alert("It was not possible to reject the reservation");
          }
        }
    }

  return (

    <div className='flex flex-col h-screen justify-center items-center gap-2'>
            <div className="p-6 rounded-xl w-auto h-auto bg-white shadow-lg">
                <Link to={`/apartments/${id}/reservations`} className='btn btn-primary'>Back</Link>
                {!client && 
                <div className="flex flex-col gap-1"> 
                    <h1 className="my-1"><strong>Apartment:</strong> {selectedReservation?.apartment.name}</h1>
                    <h1 className="my-1"><strong>Client:</strong> {selectedReservation?.client.username}</h1>
                    <h2 className="my-1"><strong>Status:</strong> {selectedReservation?.status}</h2>
                    <h4 className="my-1"><strong>Price:</strong> {selectedReservation?.price} </h4>
                    <h5 className="my-1"><strong>Number of people:</strong> {selectedReservation?.numberOfPeople}</h5>
                    <h6 className="my-1"><strong>Start Date:</strong> {selectedReservation?.startDate}</h6>
                    <h6 className="my-1"><strong>End Date:</strong> {selectedReservation?.endDate}</h6>
                    <div className="flex flex-row justify-center">
                        <button className="btn btn-success mt-4 w-max" onClick={acceptReservation}>
                            Accept 
                        </button>
                        <button className="btn btn-error mt-4 w-max" onClick={rejectReservation}>
                            Reject
                        </button>
                    </div>
                </div>
                }
                {client &&
                <>
                    <div className="flex flex-col gap-1"> 
                        <h1 className="my-1"><strong>Apartment:</strong> {selectedReservation?.apartment.name}</h1>
                        <h2 className="my-1"><strong>Status:</strong> {selectedReservation?.status}</h2>
                        <h4 className="my-1"><strong>Price:</strong> {selectedReservation?.price} </h4>
                        <h5 className="my-1"><strong>Number of people:</strong> {selectedReservation?.numberOfPeople}</h5>
                        <h6 className="my-1"><strong>Start Date:</strong> {selectedReservation?.startDate}</h6>
                        <h6 className="my-1"><strong>End Date:</strong> {selectedReservation?.endDate}</h6>
                    </div>
                    <div className="flex flex-row justify-center">
                        <button className="btn btn-success mt-4 w-max" onClick={checkInReservation}>
                            Check In
                        </button>
                        <button className="btn btn-error mt-4 w-max" onClick={checkOutReservation}>
                            Check Out
                        </button>
                    </div>
                </>
                }
            </div>
        </div>
  );
};

export default ReservationDetails;

function useReservationSelector(arg0: (state: any) => any) {
    throw new Error('Function not implemented.');
}
