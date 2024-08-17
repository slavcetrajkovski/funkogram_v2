import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps ) {
    const { currentPage, totalPages, onPageChange } = props

    const rangeStart = Math.max(currentPage - 2, 0);
    const rangeEnd = Math.min(currentPage + 3, totalPages);

    const pages = [];
    for (let i = rangeStart; i < rangeEnd; i++) {
        pages.push(i);
    }

    return (
        <div className="flex space-x-2 mb-4">
            <button
                className='px-4 py-2 text-funkogram_red'
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                <FontAwesomeIcon icon={faChevronLeft as IconProp} />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-2 py-2 text-black ${currentPage === page ? 'text-funkogram_red font-bold' : 'hover:text-funkogram_red hover:font-bold'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </button>
            ))}
            <button
                className='px-4 py-2 text-funkogram_red'
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                <FontAwesomeIcon icon={faChevronRight as IconProp} />
            </button>
        </div>
    );
};

