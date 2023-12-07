import { useEffect } from "react";
import Pagination from "./Pagination";
import ApartmentInList from "./ApartmentInList";
import { loadApartments, setCurrentPage, setFilter } from "../store/apartments";
import { useApartmentsSelector, useAppDispatch } from "../store/hooks";
import useInput from "../utils";

const ApartmentsList = () => {
    const dispatch = useAppDispatch()
    const apartmentPage = useApartmentsSelector(state => state.apartmentPage)

    const columns = [
        'Name', 'ID', 'Location', 'Description', 'Amenities'
    ]

    const row = (data: any) => {
        return (
            <tr className="clickableRow">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-blue">
                    <ApartmentInList apartment={data} key={data.id} />
                </th>
                <td className="px-4 py-2">{data.id}</td>
                <td className="px-4 py-2">{data.location}</td>
                <td className="px-4 py-2">{data.description}</td>
                <td className="px-4 py-2">{data.amenities}</td>
            </tr>
        )
    }

    useEffect(() => {
        dispatch(loadApartments(apartmentPage.currentPage));
    }, [apartmentPage.currentPage, dispatch]);

    const prevPage = () => {
        if (apartmentPage.currentPage > 0) {
            dispatch(setCurrentPage(apartmentPage.currentPage - 1));
        }
    };

    const nextPage = () => {
        if (!apartmentPage.isLastPage) {
            console.log(apartmentPage)

            dispatch(setCurrentPage(apartmentPage.currentPage + 1));
        }
    };

    return (
        <>

            <div className='flex flex-col h-screen justify-center items-center gap-2 sm:rounded-lg'>
                <table className='p-4 rounded-xl w-auto h-auto bg-white shadow-lg'>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map(c => {
                                return <th scope="col" className="p-2">{c}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(apartmentPage.apartments)?.map(prop => {
                            return row(prop);
                        })}

                    <tr>

                    <td colSpan={columns.length} style={{textAlign: 'center', marginTop: '2rem'}}>
                        <Pagination
                            prevPage={prevPage}
                            nextPage={nextPage}
                            currentPage={apartmentPage.currentPage}
                            isLastPage={apartmentPage.isLastPage}
                        />
                    </td>
                    </tr>
                    </tbody>
                </table>




                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default ApartmentsList;