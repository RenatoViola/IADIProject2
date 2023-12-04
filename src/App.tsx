import Homepage from './Homepage';
import { Link, Route, Routes } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Action, Reducer } from "redux";
import { useSelector, useDispatch, Provider } from "react-redux";
import { store } from './store';


function App() {



  return (
    <>
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
