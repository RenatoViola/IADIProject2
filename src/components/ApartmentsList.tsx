import { useEffect } from "react";
import "./ApartmentsList.css"

import Pagination from "./Pagination";
import ApartmentInList from "./ApartmentInList";
import { loadApartments, loadOwnerApartments, setCurrentPage, setFilter } from "../store/apartments";
import { useApartmentsSelector, useAppDispatch, useUserSelector } from "../store/hooks";
import { State } from "../store/index";
import useInput from "../utils";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Apartment } from "../models";
import Sidebar from "./Sidebar";



const ApartmentsList = (props: any) => {

    const { role } = props;

    function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "black" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "black" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: React.createElement(SampleNextArrow),
        prevArrow: React.createElement(SamplePrevArrow),
    };

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
        if (userData.user?.role === 'OWNER') {
            dispatch(loadOwnerApartments(userData));
        } else {
            dispatch(loadApartments(apartmentPage.currentPage));
        }
    }, [dispatch, userData.user?.role, apartmentPage.currentPage, userData]);

    /*
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
*/
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

        <div className='flex flex-col h-screen justify-center items-center'>
            
            {userData.user?.role === "CLIENT" && 
            <div className="flex overflow-x-auto pb-4">
                  {apartmentPage.apartments.map(apartment => (
                    <div key={apartment.id} className="flex-none w-64 mr-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={apartment.pictureUrls} alt="" className="w-full h-64 object-cover" />
                            <div className="p-4">
                            <ApartmentInList apartment={apartment} key={apartment.id} />
                                <p className="text-sm text-gray-500">{apartment.location}</p>
                            </div>
                        </div>
                    </div>
                ))}</div> }


{userData.user?.role === "OWNER" && 
            <div className="w-full sm:w-1/2">
                 <Slider {...settings}>
                    {
                        apartments.apartments.map(apartment => (
                            <div key={apartment.id} className="p-4">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img src={apartment.pictureUrls} alt="" className="w-full h-64 object-cover" />
                                    <div className="p-4">
                                        <ApartmentInList apartment={apartment} key={apartment.id} />
                                        <p className="text-sm text-gray-500">{apartment.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Slider>
                </div>}

            {userData.user?.role === 'CLIENT' &&
                <Pagination
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={apartmentPage.currentPage}
                    isLastPage={apartmentPage.currentPage >= Math.ceil(apartments.apartments.length / 5) - 1}
                />}
        </div>


        //<div className='flex flex-col h-screen justify-center items-center gap-2'>
        //    <div className="w-full sm:w-1/2">
        //        <Slider {...settings}>
        //            {userData.user?.role === "OWNER" && apartments.apartments.map(apartment => (
        //                <div key={apartment.id} className="p-4">
        //                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        //                        <img src={apartment.pictureUrls} alt="" className="w-full h-64 object-cover" />
        //                        <div className="p-4">
        //                            <ApartmentInList apartment={apartment} key={apartment.id} />
        //                            <p className="text-sm text-gray-500">{apartment.location}</p>
        //                        </div>
        //                    </div>
        //                </div>
        //            ))}
        //            </Slider>
        //            {userData.user?.role === "CLIENT" && apartmentPage.apartments.map((apartment: Apartment) => (
        //                <>
        //                    {console.log("aquuuuuuuuuuuuuuuuuuuuuuuui")}
        //                    {console.log(apartment)}
        //                    <div key={apartment.id} className="p-4">
        //                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        //                            <img src={apartment.pictureUrls} alt="" className="w-full h-64 object-cover" />
        //                            <div className="p-4">
        //                                <ApartmentInList apartment={apartment} key={apartment.id} />
        //                                <p className="text-sm text-gray-500">{apartment.location}</p>
        //                            </div>
        //                        </div>
        //                    </div>
        //                </>
        //            ))}
        //    </div>
        //    {userData.user?.role === 'CLIENT' &&
        //        <Pagination
        //            prevPage={prevPage}
        //            nextPage={nextPage}
        //            currentPage={apartmentPage.currentPage}
        //            isLastPage={apartmentPage.isLastPage}
        //        />}
        //
        //</div>
    );
}

export default ApartmentsList;
/*
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
*/