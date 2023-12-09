import { Link, useNavigate, useParams } from "react-router-dom";
import { Apartment, Review } from "../models";
import { useEffect, useState } from "react";
import AvailabilityCalendar from "../components/AvailabilityCalendar/AvailabilityCalendar";
import CalendarModal from "../components/CalendarModal";

const ApartmentDetails = (role: any) => {

    const { id } = useParams()

    const apartmentsPageUrl = `http://localhost:8080/apartments/${id}`;

    const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apartmentsPageUrl)
            .then(response => response.json())
            .then(data => {
                setSelectedApartment(data);
                console.log(data);
                setIsLoading(false);
            });

        fetch(`http://localhost:8080/apartments/${id}/reviews`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                console.log(data);
            });
    }, []);

    const listOfReservations = () => {
        return (
            <Link to={`/apartments/${selectedApartment?.id}`} className="text-blue">
                List of Reservations
            </Link>
        )
    }

    if (isLoading)
        return <div>Loading...</div>;

    if (!selectedApartment)
        return <div>Apartment not found.</div>;

    return (
        <div className='flex flex-row h-screen justify-center items-center gap-2'>
            <div className="p-6 rounded-xl w-auto h-auto bg-white shadow-lg">
                <Link to='/apartments' className='btn btn-primary'>Back</Link>
                <div className="flex flex-col gap-1">
                    <div className="flex mt-4">
                        <img src={selectedApartment.pictureUrls} alt="" width={400} className="rounded-xl" />
                    </div>
                    <h1 className="my-1"><strong>Apartment name:</strong> {selectedApartment.name}</h1>
                    <h2 className="my-1"><strong>Description:</strong> {selectedApartment.description} </h2>
                    <h3 className="my-1"><strong>Amenities:</strong> {selectedApartment.amenities}</h3>
                    <h4 className="my-1"><strong>Price per night:</strong> {selectedApartment.pricePerNight} $</h4>
                    <h5 className="my-1"><strong>Location:</strong> {selectedApartment.location}</h5>
                </div>
                <div className="flex flex-row justify-center">
                    {
                        role.roleUser.role == 'OWNER' &&
                        <Link to={`/apartments/${selectedApartment?.id}/reservations`} className='btn btn-primary'>List of Reservations</Link>
                            
                            
                            
                            
                    }
                            <button className="btn btn-primary mt-4 w-max" onClick={() => setIsOpen(true)}>
                                Calendar
                            </button>
                        
                            

                </div>
                {id !== undefined && isOpen && <CalendarModal id={id} name={selectedApartment.name} closeModal={() => setIsOpen(false)} />}
            </div>
            {reviews.length > 0 &&
                <div className="p-6 rounded-xl w-96 h-3/6 bg-white shadow-lg ml-5">
                    <h4 className="text-center"><strong>Reviews</strong></h4>
                    <div className="flex flex-col gap-2">
                        {reviews.map(review => {
                            return (
                                <div className="flex flex-col gap-1 bg-slate-100 rounded-lg mt-2">
                                    <div className="ml-2">
                                        <h1 className="my-1"><strong>Comment:</strong> {review.text}</h1>
                                        <h2 className="my-1 flex items-center">
                                            <strong>Rating:</strong>
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-4 h-4 ${index < review.rating ? 'text-yellow-300' : 'text-gray-300'} ms-1`}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}</h2>


                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
        </div>

    );
}

export default ApartmentDetails;