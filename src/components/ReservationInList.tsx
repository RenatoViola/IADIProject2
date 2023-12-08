import { Link } from "react-router-dom";
import { Reservation } from "../models";

const ReservationInList = ({ reservation }: { reservation: Reservation }) => {
    return (
        <Link to={`/reservations/${reservation.id}`} className="text-blue">
            {reservation.id}
        </Link>
    );
}

export default ReservationInList;