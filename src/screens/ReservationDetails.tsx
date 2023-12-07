import React, { useEffect, useState } from 'react';
import '../css/ReservationDetails.css';

// interface ReservationDetailsProps {
//     id: number;
//     startDate: string;
//     endDate: string;
//     numberOfPeople: number;
//     price: number;
//     status: string;
//     clientName: string;
//     apartmentName: string;
// }

// const ReservationDetails: React.FC<ReservationDetailsProps> = ({
//   startDate,
//   endDate,
//   clientName,
//   apartmentName,
// }) => {

const ReservationDetails = () => {
    const [client, setClient] = useState(false);
    const [checkIn, setCheckIn] = useState(false);

    useEffect(() => {

        //verificar se é client ou owner
        //verificar se é pa fazer check-in ou check-out
    
    })

  return (
    <div className="reservation-container">
      <div className="sidebar">
        <div className="sidebar-item">List Apartments</div>
        <div className="sidebar-item">List Reservations</div>
      </div>
      <div className="details">
        <header>
          <h1>Details of a reservation</h1>
        </header>
        <div className="info-group">
          <label>Start Date</label>
        </div>
        <div className="info-group">
          <label>End Date</label>
        </div>
        <div className="info-group">
          <label>Client</label>
        </div>
        <div className="info-group">
          <label>Apartment</label>
        </div>
        <div className="actions">

            {/* {
            client ? 
            checkIn ? <button className="accept">Check-In</button> : <button className="accept">Check-Out</button>
            <button className="accept">Make Review</button>
            <button className="reject">Cancel</button>
            :
            <button className="accept">Accept</button>
            <button className="reject">Reject</button>
} */}
          <button className="accept">Accept</button>
          <button className="reject">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;