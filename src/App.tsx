import Homepage from './Homepage';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import { Link, Route, Routes } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              Homepage
            </Link>
          </li>
          <li>
            <Link to='/apartments'>
              ApartmentsList
            </Link>
          </li>
        </ul>
      </nav>
      <br />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/apartments/*' element={<ApartmentRoutes />} />
        <Route path='/calendar' element={<AvailabilityCalendar />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
