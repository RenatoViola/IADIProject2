import React, { useEffect, useState } from 'react';
import '../css/ReservationDetails.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../store/index';
import { Reservation, Status } from '../models';
import axios from 'axios';


const ReservationDetails = () => {

  const { id } = useParams()

  const reservationsPageUrl = `http://localhost:8080/reservations/${id}`;

  const [client, setClient] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const userData = useSelector((state: State) => state.user);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [statusHistory, setStatusHistory] = useState<Status[]>([]);

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
    if (userData.user?.role == 'CLIENT') {
      setClient(true);
    }
    else {
      setClient(false);
    }
    console.log(userData);
  }, [userData, reservationsPageUrl]);

  useEffect(() => {
    const token = userData?.token; // Assuming the token is stored directly under userData

    const fetchOptions = {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        // Include other headers as needed
      }
    };
    fetch(`http://localhost:8080/reservations/${id}/history`, fetchOptions)
      .then(response => response.json())
      .then(data => {
        console.log("HISTORYYYYYYYYYYYYYY : " + data)
        setStatusHistory(data);
        console.log(data)

      });


  }, [userData, reservationsPageUrl])

  const checkInReservation = async () => {
    let response;

    try {
      response = await axios.put(`http://localhost:8080/reservations/${id}/checkIn`, {}, {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });
      console.log('Check in successful:', response.data);
      alert("Check In successful")
    } catch (error) {
      // Handle errors
      console.error('Error making reservation:', error);
      console.error('Error making reservation:', response?.headers);

    }

  }

  const checkOutReservation = async () => {

    try {
      const response = await axios.put(`http://localhost:8080/reservations/${id}/checkOut`, {}, {
        headers: {
          'Authorization': `Bearer ${userData.token}`

        }
      })
      console.log('Check out successful:', response.data);
      alert("Check Out successful")
    } catch (error) {
      // Handle errors
      console.error('Error making reservation:', error);
    }

  }

  const acceptReservation = async () => {

    try {
      const response = await axios.put(`http://localhost:8080/reservations/${id}/confirmation`, {}, {
        headers: {
          'Authorization': `Bearer ${userData.token}`,
        }
      });
      console.log('Reservation accepted:', response.data);
      alert("Reservation accepted");
    } catch (error) {
      // Handle errors
      console.error('Error accepting reservation:', error);
      alert("It was not possible to accept the reservation");
    }

  }

  const rejectReservation = async () => {

    try {
      const response = await axios.put(`http://localhost:8080/reservations/${id}/rejection`, {}, {
        headers: {
          'Authorization': `Bearer ${userData.token}`,
        }
      });
      console.log('Reservation rejected:', response.data);
      alert("Reservation rejected");
    } catch (error) {
      // Handle errors
      console.error('Error rejecting reservation:', error);
      alert("It was not possible to reject the reservation");
    }

  }

  const cancelReservation = async () => {

    try {
      const response = await axios.put(`http://localhost:8080/clients/${userData.user?.username}/reservations/${id}/cancellation`, {}, {
        headers: {
          'Authorization': `Bearer ${userData.token}`,
        },
      });
      console.log('Reservation cancelled:', response.data);
      alert("Reservation cancelled");
    } catch (error) {
      // Handle errors
      console.error('Error cancelling reservation:', error);
      alert("It was not possible to cancel the reservation");
    }

  }

  return (

    <div className='flex flex-row h-screen justify-center items-center gap-2'>
      <div className="p-6 rounded-xl w-auto h-auto bg-white shadow-lg">
        <Link to={`/apartments/${id}/reservations`} className='btn btn-primary'>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </Link>
        {!client &&
          <div className="flex flex-col gap-1">
            <div className="flex mt-4">
              <img src={selectedReservation?.apartment.pictureUrls} alt="" width={400} className="rounded-xl" />
            </div>
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
            <div className="flex flex-col gap-1 justify-center">
              <div className="flex mt-4">
                <img src={selectedReservation?.apartment.pictureUrls} alt="" width={400} className="rounded-xl" />
              </div>
              <h1 className="my-1"><strong>Apartment:</strong> {selectedReservation?.apartment.name}</h1>
              <h2 className="my-1"><strong>Status:</strong> {selectedReservation?.status}</h2>
              <h4 className="my-1"><strong>Price:</strong> {selectedReservation?.price} </h4>
              <h5 className="my-1"><strong>Number of people:</strong> {selectedReservation?.numberOfPeople}</h5>
              <h6 className="my-1"><strong>Start Date:</strong> {selectedReservation?.startDate}</h6>
              <h6 className="my-1"><strong>End Date:</strong> {selectedReservation?.endDate}</h6>
            </div>
            <div className="flex flex-row justify-center">
              {selectedReservation?.status == 'BOOKED' &&
                <button className="btn btn-success mt-4 w-max" onClick={checkInReservation}>
                  Check In
                </button>}
              {selectedReservation?.status == 'OCCUPIED' &&
                <button className="btn btn-success mt-4 w-max" onClick={checkOutReservation}>
                  Check Out
                </button>}
              {selectedReservation?.status == 'UNDER_CONSIDERATION' &&
                <button className="btn btn-error mt-4 w-max" onClick={cancelReservation}>
                  Cancel
                </button>}
            </div>

          </>
        }
      </div>

      <div className="p-6 rounded-xl w-96 h-3/6 bg-white shadow-lg ml-5">
        <h4 className="text-center"><strong>Status History</strong></h4>
        <div className="flex flex-col gap-2">
          {statusHistory.map(status => {
            return (
              <div className="flex flex-col gap-1 bg-slate-100 rounded-lg mt-2">
                <div className="ml-2">
                  <h1 className="my-1"><strong>Status: </strong> {status.state}</h1>
                  <h2 className="my-1"><strong>Date: </strong>{status.transitionDate}</h2>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;

function useReservationSelector(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}
