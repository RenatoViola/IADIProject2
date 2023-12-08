import { useEffect } from "react";
import Pagination from "./Pagination";
import ApartmentInList from "./ApartmentInList";
import { loadApartments, loadOwnerApartments, setCurrentPage, setFilter } from "../store/apartments";
import { useApartmentsSelector, useAppDispatch, useUserSelector } from "../store/hooks";
import { State } from "../store/index";
import useInput from "../utils";
import { useSelector } from "react-redux";

const ApartmentsList = (role : any) => {
    const dispatch = useAppDispatch()
    const apartmentPage = useApartmentsSelector(state => state.apartmentPage)
    const apartments = useApartmentsSelector(state => state.apartments)
    const userData = useSelector((state: State) => state.user);
    
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
        console.log("aquiiiiiiiiiiiiiii")
        console.log(role.roleUser.role)
        if(role.roleUser.role === 'OWNER'){
            const result = dispatch(loadOwnerApartments(userData));
            console.log("FOI PARA O OWNER")
            console.log(result)
        } else{
            const result = dispatch(loadApartments(apartmentPage.currentPage));
            console.log("FOI PARA O CLIENT")
            console.log(result)
        }
    }, [apartmentPage.currentPage, apartments.ownerUsername, dispatch]);

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

                        {role.roleUser.role === 'CLIENT' ? (
                        Object.values(apartmentPage.apartments)?.map(prop => {
                            return row(prop);
                        }))
                    :
                    (Object.values(apartments.apartments)?.map(prop => {
                        return row(prop);}))                  }
                    

                    <tr>
                    <td colSpan={columns.length} style={{textAlign: 'center', marginTop: '2rem'}}>
                        {role.roleUser.role === 'CLIENT' && 
                        <Pagination
                            prevPage={prevPage}
                            nextPage={nextPage}
                            currentPage={apartmentPage.currentPage}
                            isLastPage={apartmentPage.isLastPage}
                        />}
                    </td>
                    </tr>
                    </tbody>
                </table>

            </div>
    );
}

export default ApartmentsList;