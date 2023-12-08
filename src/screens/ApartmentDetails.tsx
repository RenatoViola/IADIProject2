import { Link, useParams } from "react-router-dom";
import { Apartment } from "../models";
import { useEffect, useState } from "react";
import AvailabilityCalendar from "../components/AvailabilityCalendar/AvailabilityCalendar";
import CalendarModal from "../components/CalendarModal";

const ApartmentDetails: React.FC = () => {

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
            <div className="p-6 rounded-xl w-auto h-auto bg-white shadow-lg">
                <Link to='/apartments' className='btn btn-primary'>Back</Link>
                <div className="flex flex-col gap-1">
                    <div className="flex mt-4">
                        <img src={selectedApartment.pictureUrls} alt="" width={400} className="rounded-xl"/>
                    </div>
                    <h1 className="my-1"><strong>Apartment name:</strong> {selectedApartment.name}</h1>
                    <h2 className="my-1"><strong>Description:</strong> {selectedApartment.description} </h2>
                    <h3 className="my-1"><strong>Amenities:</strong> {selectedApartment.amenities}</h3>
                    <h4 className="my-1"><strong>Price per night:</strong> {selectedApartment.pricePerNight}</h4>
                    <h5 className="my-1"><strong>Location:</strong> {selectedApartment.location}</h5>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <button className="btn btn-primary mt-4 w-full" onClick={() => setIsOpen(true)}>
                            Book now
                    </button>
                </div>
                {id !== undefined && isOpen && <CalendarModal id={id} name={selectedApartment.name} closeModal={() => setIsOpen(false)}/>}
            </div>
        </div>

    );
}

export default ApartmentDetails;