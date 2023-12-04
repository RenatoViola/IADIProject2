import Homepage from './Homepage';
import { Link, Route, Routes } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Action, Reducer } from "redux";
import { useSelector, useDispatch, Provider } from "react-redux";
import { store } from './store';

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
      <br />
      <nav>
        <ul>
          <li>
            <Link to='/' reloadDocument>
              Homepage
            </Link>
          </li>
          <li>
            <Link to='/apartments' reloadDocument>
              List of apartments
            </Link>
          </li>
        </ul>
      </nav>
      <br />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/apartments/*' element={<ApartmentRoutes />} />
      </Routes>
    </>
  );
}


const RdxApp = () => 
  <Provider store={store}>
    <App/>
  </Provider>

export default RdxApp;
