import React, { useEffect, useState } from 'react';

interface ReservationsList {
    startDate: string;
    endDate: string;
    clientName: string;
    apartmentName: string;
  }
  
  const ApartmentDetails: React.FC<ReservationsList> = ({
    startDate,
    endDate,
    clientName,
    apartmentName,
  }) => {
  
  
      useEffect(() => {
  
      
      })
  
  
    return (
      <div className="reservation-container">
        <div className="sidebar">
          <div className="sidebar-item">List Apartments</div>
          <div className="sidebar-item">List Reservations</div>
        </div>
        <div className="details">
          <header>
            <h1>Details of an appartment</h1>
          </header>
          <div className="info-group">
            <label>Start Date</label>
            <div>{startDate}</div>
          </div>
          <div className="info-group">
            <label>End Date</label>
            <div>{endDate}</div>
          </div>
          <div className="info-group">
            <label>Client</label>
            <div>{clientName}</div>
          </div>
          <div className="info-group">
            <label>Apartment</label>
            <div>{apartmentName}</div>
          </div>
  
          
        </div>
      </div>
    );
  };
export default ReservationsList;
