import React from 'react';

type PaginationProps = {
    prevPage: () => void;
    nextPage: () => void;
    currentPage: number;
    isLastPage: boolean;
};

const Pagination: React.FC<PaginationProps> = ({ prevPage, nextPage, currentPage, isLastPage }) => {
    return (
        <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <ul className="flex justify-center space-x-2 text-sm h-8 mx-auto">
            
            <a onClick={prevPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            <a onClick={nextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </ul>
    </div>
    );
}

export default Pagination;
