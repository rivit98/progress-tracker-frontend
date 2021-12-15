import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/all';

const PaginationButton = ({ children, fn, ...props }) => {
    return (
        <Button
            size={'xs'}
            m={0}
            colorScheme={'teal'}
            _hover={{ bg: 'teal.300' }}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            onClick={fn}
            {...props}
        >
            {children}
        </Button>
    );
};

export const Paginate = ({ currentPage, setCurrentPage, total, perPage }) => {
    const totalPages = Math.ceil(total / perPage);
    const siblings = 3;

    let pages = [];
    for (let p = currentPage - siblings; p <= currentPage + siblings; p++) {
        pages.push(p);
    }
    pages = pages.filter((p) => p > 0 && p <= totalPages);

    return (
        <HStack mt={6} spacing={1}>
            <PaginationButton fn={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage <= 1}>
                <MdChevronLeft />
            </PaginationButton>
            {!pages.includes(1) && (
                <PaginationButton fn={() => setCurrentPage(1)} isDisabled={currentPage === 1}>
                    1
                </PaginationButton>
            )}

            {pages.map((page) => (
                <PaginationButton key={page} fn={() => setCurrentPage(page)} isDisabled={currentPage === page}>
                    {page}
                </PaginationButton>
            ))}
            {!pages.includes(totalPages) && (
                <PaginationButton fn={() => setCurrentPage(totalPages)} isDisabled={currentPage === totalPages}>
                    {totalPages}
                </PaginationButton>
            )}

            <PaginationButton fn={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage >= totalPages}>
                <MdChevronRight />
            </PaginationButton>
        </HStack>
    );
};
