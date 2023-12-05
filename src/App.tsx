import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Provider } from "react-redux";
import { store } from './store';

import LoginPage from './screens/LoginPage';
import { useAppDispatch, useUserSelector } from "./store/hooks";
import { logout } from "./store/user";
import { useEffect } from "react";
import { ClientArea } from "./areas/ClientArea";
import { OwnerArea } from "./areas/OwnerArea";
import { ManagerArea } from "./areas/ManagerArea";

function App() {

  const dispatch = useAppDispatch();
  const authenticatedUserDetails = useUserSelector(state => state)

  const navigate = useNavigate();

  useEffect(() => {

    if (!authenticatedUserDetails.isAuthenticated)
      navigate('/')
    else
      if (authenticatedUserDetails.role === 'OWNER')
        navigate('/owners')
      else if (authenticatedUserDetails.role === 'CLIENT')
        navigate('/clients')
      else if (authenticatedUserDetails.role === 'MANAGER')
        navigate('/managers')

  }, [authenticatedUserDetails])

  return (
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/clients/*' element={<ClientArea />} />
        <Route path='/owners/*' element={<OwnerArea />} />
        <Route path='/managers/*' element={<ManagerArea />} />
        <Route path='/apartments/*' element={<ApartmentRoutes />} />
      </Routes>
  );
}

const RdxApp = () =>
  <Provider store={store}>
    <App />
  </Provider>

export default RdxApp;
