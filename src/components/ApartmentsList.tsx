import { useEffect, useState } from "react";
import { Apartment } from "../models";
import Pagination from "./Pagination";
import ApartmentInList from "./ApartmentInList";
import { Link } from "react-router-dom";

const ApartmentsList = () => {

    const apartmentsPageUrl = 'http://localhost:8080/apartments';

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [isLastPage, setIsLastPage] = useState(false);

    const [selectedApartments, setSelectedApartments] = useState<Apartment[]>([]);

    useEffect(() => {
        fetch(`${apartmentsPageUrl}?page=${currentPage}`)
            .then(response => response.json())
            .then(res => {
                setSelectedApartments(res.data);
                setTotalPages(res.totalPages);
                setIsLastPage(res.isLastPage);
            });
    }, [currentPage]);


    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage => currentPage - 1);
        }
    };

    const nextPage = () => {
        if (!isLastPage) {
            setCurrentPage(currentPage => currentPage + 1);
        }
    };

    return (
        <>
            <div>
                {selectedApartments.map(a => (
                    <>
                        <Link to={`/apartments/${a.id}`}>
                            <ApartmentInList apartment={a} />
                        </Link>
                    </>
                ))}
            </div>

            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                currentPage={currentPage}
                isLastPage={isLastPage}
            />
        </>
    );

}

export default ApartmentsList;