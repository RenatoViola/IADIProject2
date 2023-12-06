import { useEffect } from "react";
import Pagination from "./Pagination";
import ApartmentInList from "./ApartmentInList";
import { loadApartments, setCurrentPage, setFilter } from "../store/apartments";
import { useApartmentsSelector, useAppDispatch } from "../store/hooks";
import useInput from "../utils";

const ApartmentsList = () => {
    const dispatch = useAppDispatch()
    const apartmentPage = useApartmentsSelector(state => state.apartmentPage)
    const [inputName, searchName, setSearchName] = useInput("", "Search name", "text", "")

    useEffect(() => {
        dispatch(loadApartments(apartmentPage.currentPage));
    }, [apartmentPage.currentPage, dispatch]);

    useEffect(() => { dispatch(setFilter(searchName)) }, [searchName])

    const prevPage = () => {
        if (apartmentPage.currentPage > 0) {
            dispatch(setCurrentPage(apartmentPage.currentPage - 1));
        }
    };

    const nextPage = () => {
        if (!apartmentPage.isLastPage) {
            dispatch(setCurrentPage(apartmentPage.currentPage + 1));
        }
    };

    const filteredApartments = apartmentPage.apartments.filter(a => (a.name.toLowerCase()).includes(searchName.toLowerCase()))

    return (
        // <div className='flex flex-col justify-center gap-2'>
        <div className='flex flex-col h-screen justify-center items-center gap-2'>
            <div style={{ width: '400px', height: '40px' }}>
            {inputName}
            </div>
            <div className=" flex flex-col items-center gap-1">
                {filteredApartments.map(a => (
                    <ApartmentInList apartment={a} key={a.id}/>
                ))}
            </div>

            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                currentPage={apartmentPage.currentPage}
                isLastPage={apartmentPage.isLastPage}
            />
        </div>
    );
}

export default ApartmentsList;