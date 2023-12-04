import { Link, Route, Routes } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Provider } from "react-redux";
import { store } from './store';

import Homepage from './screens/Homepage';

function App() {

  return (
    <>
      {/* <ReservationDetails startDate={''} endDate={''} clientName={''} apartmentName={''} id={0} numberOfPeople={0} price={0} status={''} /> */}
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
    <App />
  </Provider>

export default RdxApp;
