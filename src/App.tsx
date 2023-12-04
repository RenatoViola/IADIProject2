import { Link, Route, Routes } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Provider } from "react-redux";
import { store } from './store';

import Homepage from './screens/Homepage';
import { useAppDispatch, useUserSelector } from "./store/hooks";
import { logout } from "./store/user";

function App() {

  const dispatch = useAppDispatch();
  const authenticatedUserDetails = useUserSelector(state => state)

  return (
    <>
      {/* <ReservationDetails startDate={''} endDate={''} clientName={''} apartmentName={''} id={0} numberOfPeople={0} price={0} status={''} /> */}
      
      
      {authenticatedUserDetails.isAuthenticated &&
        <>
          <h2>
            Welcome, user named <b>{authenticatedUserDetails.username}</b>, with role <b>{authenticatedUserDetails.role}</b>.
          </h2>
          <button className='btn btn-active btn-primary mt-4' onClick={() => dispatch(logout())}>
            Logout
          </button>
        </>
      }

      <br />
      <nav>
        <ul>
          <li>
            <Link to='/'>
              Homepage
            </Link>
          </li>
          <li>
            <Link to='/apartments'>
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
    <App />
  </Provider>

export default RdxApp;
