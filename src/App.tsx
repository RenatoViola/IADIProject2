import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Provider } from "react-redux";
import { store } from './store';
import './css/App.css';
import LoginPage from './screens/LoginPage';
import { useAppDispatch, useUserSelector } from "./store/hooks";
import { logout } from "./store/user";
import { useEffect } from "react";
import { ClientArea } from "./areas/ClientArea";
import { OwnerArea } from "./areas/OwnerArea";
import { ManagerArea } from "./areas/ManagerArea";
import Sidebar from "./components/Sidebar";
import ReservationsList from "./screens/ReservationsList";
import ReservationRoutes from "./routes/ReservationRoutes";

function App() {

   const dispatch = useAppDispatch();
   const authenticatedUserDetails = useUserSelector(state => state)

   const navigate = useNavigate();

   useEffect(() => {
      console.log("---------1----------" + authenticatedUserDetails.isAuthenticated)
      if (!authenticatedUserDetails.isAuthenticated)
         navigate('/')
      else
         navigate("/apartments")

      console.log("---------2----------" + authenticatedUserDetails.isAuthenticated)

   }, [authenticatedUserDetails])

   return (


      <div className="wrapper">
         {authenticatedUserDetails.isAuthenticated && (
            <Sidebar role={authenticatedUserDetails.user?.role} />
         )}
         <div className="content">
            <Routes>
               {!authenticatedUserDetails.isAuthenticated ? (
                  <Route path="/" element={<LoginPage />} />
               ) : (
                  <>
                     <Route path="/clients/*" element={<ClientArea />} />
                     <Route path="/owners/*" element={<OwnerArea />} />
                     <Route path="/managers/*" element={<ManagerArea />} />
                     <Route path="/apartments/*" element={<ApartmentRoutes role={authenticatedUserDetails.user?.role} />} />
                     <Route path="/reservations/*" element={<ReservationRoutes role={authenticatedUserDetails.user?.role} />} />
                  </>
               )}
            </Routes>
         </div>
      </div>
   );

}

const RdxApp = () =>
   <Provider store={store}>
      <App />
   </Provider>

export default RdxApp;
