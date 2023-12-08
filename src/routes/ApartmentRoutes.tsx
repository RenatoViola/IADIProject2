import { Route, Routes } from "react-router-dom";
import ApartmentDetails from "../screens/ApartmentDetails";
import ApartmentsList from "../components/ApartmentsList";

const ApartmentRoutes = (role : any) => {

    return (
        <Routes>
            <Route index element={<ApartmentsList roleUser={role}/>} />
            <Route path=':id' element={<ApartmentDetails />} />
            <Route path=':id/reviews' element={<ApartmentDetails />} />
            <Route path=':id/reservations' element={<ApartmentDetails />} />
        </Routes>
    );

}

export default ApartmentRoutes;