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


       <div>
          {authenticatedUserDetails.isAuthenticated && (
             <Sidebar />
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
                      <Route path="/reservations" element={<ReservationRoutes />} />
                   </>
                )}
             </Routes>
          </div>
       </div>
    );
   {/* {
      authenticatedUserDetails.isAuthenticated && (
         <div className="flex">
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
               <div className="h-full px-3 py-40 overflow-y-auto bg-blue-400 dark:bg-blue-1000">
                  <ul className="space-y-2 font-medium">
                     <li>
                        <a href="#" className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group">

                           <span className="ms-3">List of Apartments</span>
                        </a>
                     </li>

                     <li>
                        <a href="#" className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group">
                           <span className="flex-1 ms-3 whitespace-nowrap">List of Reservations</span>
                        </a>
                     </li>
                     <li>
                        <a className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group" onClick={handleSignOut}>
                           <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                        </a>
                     </li>
                  </ul>
               </div>
            </aside>
            <div className='grow ml-64'>
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
      )
   } */}
  
}

const RdxApp = () =>
   <Provider store={store}>
      <App />
   </Provider>

export default RdxApp;
