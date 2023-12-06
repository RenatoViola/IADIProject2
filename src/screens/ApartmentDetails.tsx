import { Link, useParams } from "react-router-dom";
import { Apartment } from "../models";
import { useEffect, useState } from "react";
import AvailabilityCalendar from "../components/AvailabilityCalendar/AvailabilityCalendar";

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
        <div className='flex flex-col h-screen justify-center items-center gap-2'>
            <div className="flex flex-col gap-1">
                <div className="flex mt-4">
                    <img src={selectedApartment.pictureUrls} alt="" width={400} className="rounded-xl"/>
                </div>
                <h1>Apartment name: {selectedApartment.name}</h1>
                <h2>Description: {selectedApartment.description} </h2>
                <h3>Amenities: {selectedApartment.amenities}</h3>
                <h4>Price per night: {selectedApartment.pricePerNight}</h4>
                <h5>Location: {selectedApartment.location}</h5>
            </div>
            {!isOpen && <button className="btn btn-primary mt-4" onClick={() => setIsOpen(true)}>
                    Open calendar
                </button>}
                {id !== undefined && isOpen && <AvailabilityCalendar id={id} closeModal={() => setIsOpen(false)} />}
        </div>

    );
}

export default ApartmentDetails;
 {/*
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
    */}
