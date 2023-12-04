import { Route, Routes } from "react-router-dom";
import ApartmentDetails from "../components/ApartmentDetails";
import ApartmentsList from "../components/ApartmentsList";

const ApartmentRoutes = () => {

    return (
        <Routes>
            <Route index element={<ApartmentsList />} />
            <Route path=':id' element={<ApartmentDetails />} />
            <Route path=':id/reviews' element={<ApartmentDetails />} />
            <Route path=':id/reservations' element={<ApartmentDetails />} />
        </Routes>
    );

}

export default ApartmentRoutes;