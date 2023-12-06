import React from 'react';

type PaginationProps = {
    prevPage: () => void;
    nextPage: () => void;
    currentPage: number;
    isLastPage: boolean;
};

const Pagination: React.FC<PaginationProps> = ({ prevPage, nextPage, currentPage, isLastPage }) => {
    return (
        <div className='flex justify-center'>
            <button className='btn' onClick={prevPage} disabled={currentPage === 0}>PREVIOUS</button>
            <button className='btn' onClick={nextPage} disabled={isLastPage}>NEXT</button>
        </div>
    );
}

export default Pagination;
