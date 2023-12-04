import { Link } from "react-router-dom";
import { Apartment } from "../models";

const ApartmentInList = ({ apartment }: { apartment: Apartment }) => {
    return (
        <Link to={`/apartments/${apartment.id}`}>
            {apartment.name}
        </Link>
    );
}

export default ApartmentInList;