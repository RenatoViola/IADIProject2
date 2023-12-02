import { useEffect, useState } from "react";
import { Apartment } from "../models";

const ApartmentsList = () => {

    const apartmentsPageUrl = 'http://localhost:8080/apartments';

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [isLastPage, setIsLastPage] = useState(false); 
    
    const [selectedApartments, setSelectedApartments] = useState<Apartment[]>([]);

    useEffect(() => {
        fetch(`${apartmentsPageUrl}?page=${currentPage}`)
        // fetch('/apartments.json')
            .then(response => response.json())
            .then(res => {
                setSelectedApartments(res.data);
                setTotalPages(res.totalPages);
                setIsLastPage(res.isLastPage);
            });
    }, [currentPage]);


    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const nextPage = () => {
        if (!isLastPage) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <>
        <div>
            {selectedApartments.map(a => (
                <div key={a.id}>{a.name}</div>
            ))}
        </div>
        <button className='btn' onClick={prevPage} disabled={currentPage === 0} >PREVIOUS</button>
        <button className='btn' onClick={nextPage} disabled={isLastPage} >NEXT</button>
        </>
    );

}

export default ApartmentsList;