import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ApartmentRoutes from './routes/ApartmentRoutes';
import { Provider } from "react-redux";
import { store } from './store';
//import './css/App.css';
import LoginPage from './screens/LoginPage';
import { useAppDispatch, useUserSelector } from "./store/hooks";
import { logout } from "./store/user";
import { useEffect } from "react";
import { ClientArea } from "./areas/ClientArea";
import { OwnerArea } from "./areas/OwnerArea";
import { ManagerArea } from "./areas/ManagerArea";
import Sidebar from "./components/Sidebar";

function App() {

   const dispatch = useAppDispatch();
   const authenticatedUserDetails = useUserSelector(state => state)

   const navigate = useNavigate();

   useEffect(() => {

      if (!authenticatedUserDetails.isAuthenticated)
         navigate('/')
      else
         navigate("/apartments")

   }, [authenticatedUserDetails])

   const handleSignOut = () => {
      alert("sair")
      navigate('/');
      //dispatch(deauthenticateUser());

   }
   return (


      <div>
         {authenticatedUserDetails.isAuthenticated && (
             <Sidebar/> 
         )}
         <div >
            <Routes>
               {!authenticatedUserDetails.isAuthenticated ? (
                  <Route path="/" element={<LoginPage />} />
               ) : (
                  <>
                     <Route path="/clients/*" element={<ClientArea />} />
                     <Route path="/owners/*" element={<OwnerArea />} />
                     <Route path="/managers/*" element={<ManagerArea />} />
                     <Route path="/apartments/*" element={<ApartmentRoutes />} />
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
