import { Route, Routes } from "react-router-dom";
import ReservationDetails from "../screens/ReservationDetails";
import ReservationList from "../screens/ReservationsList";

const ReservationRoutes = (role : any) => {

    return (
        <Routes>
            <Route index element={<ReservationList roleUser={role}/>} />
            <Route path=':id' element={<ReservationDetails />} />
        </Routes>
    );

}

export default ReservationRoutes;