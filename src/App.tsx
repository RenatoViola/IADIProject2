import React from 'react';
import Homepage from './screens/Homepage';
import ApartmentDetails from './screens/ApartmentDetails';
import ReservationDetails from './screens/ReservationDetails';
import ReservationsList from './screens/ReservationsList';

function App() {
  return (
    <>
   {/* <Homepage/>
   <ApartmentDetails/>
   <ReservationsList/>  */}
   <ReservationDetails startDate={''} endDate={''} clientName={''} apartmentName={''} id={0} numberOfPeople={0} price={0} status={''}/>
   </>
  );
}

export default App;
