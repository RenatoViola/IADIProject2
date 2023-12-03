import { Apartment } from "../models";

const ApartmentInList = ({ apartment }: { apartment: Apartment }) => {
    return (
        <div key={apartment.id}>
            {apartment.name}
        </div>
    );
}

export default ApartmentInList;