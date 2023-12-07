import { Link } from "react-router-dom";
import { Apartment } from "../models";

const ApartmentInList = ({ apartment }: { apartment: Apartment }) => {
    return (
        <Link to={`/apartments/${apartment.id}`} className="text-blue">
            {apartment.name}
        </Link>
    );
}

export default ApartmentInList;