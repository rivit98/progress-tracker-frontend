import { useState } from 'react';

export const usePagination = ({ totalItems }) => {
    const [page, setPage] = useState(1);

    const perPage = 30;
    const indexOfLastPage = page * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const totalPages = Math.ceil(totalItems / perPage);

    return { page, setPage, totalPages, indexOfFirstPage, indexOfLastPage };
};
