import { Link, useParams } from "react-router-dom";
import { Apartment } from "../models";
import { useEffect, useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar/AvailabilityCalendar";

const ApartmentDetails = () => {

    const { id } = useParams()

    const apartmentsPageUrl = `http://localhost:8080/apartments/${id}`;

    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch(apartmentsPageUrl)
            .then(response => response.json())
            .then(data => {
                setSelectedApartment(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading)
        return <div>Loading...</div>;

    if (!selectedApartment)
        return <div>Apartment not found.</div>;

    return (
        <>
            <div>
                <div>
                    <img src={selectedApartment.pictureUrls} alt="" width={400}/>
                    <h1>Apartment name: {selectedApartment.name}</h1>
                    <h2>Description: {selectedApartment.description} </h2>
                </div>
                <br />
                {!isOpen && <button className="btn" onClick={() => setIsOpen(true)}>
                    OPEN CALENDAR
                </button>}

                {id !== undefined && isOpen && <AvailabilityCalendar id={id} closeModal={() => setIsOpen(false)} />}
            </div>
        </>
    );
}

export default ApartmentDetails;
