import { Route, Routes } from "react-router-dom";
import ApartmentDetails from "../screens/ApartmentDetails";
import ApartmentsList from "../components/ApartmentsList";
import ReservationsList from "../screens/ReservationsList";

const ApartmentRoutes = (role : any) => {

    return (
        <Routes>
            <Route index element={<ApartmentsList roleUser={role}/>} />
            <Route path=':id' element={<ApartmentDetails roleUser={role}/>} />
            <Route path=':id/reviews' element={<ApartmentDetails />} />
            <Route path=':id/reservations' element={<ReservationsList roleUser={role}/>} />
        </Routes>
    );

}

export default ApartmentRoutes;