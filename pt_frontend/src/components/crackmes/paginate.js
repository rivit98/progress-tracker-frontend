import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/all';

const PaginationButton = ({ children, fn, ...props }) => {
    return (
        <Button
            size={'xs'}
            w={7}
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

export const Paginate = ({ currentPage, setCurrentPage, totalPages }) => {
    const siblings = 3;
    const shouldBe = 2 * siblings + 1;

    let pages = [];
    for (let p = currentPage - siblings; p <= currentPage + siblings; p++) {
        pages.push(p);
    }
    pages = pages.filter((p) => p > 0 && p <= totalPages);

    const to = (pagenr) => {
        return () => setCurrentPage(pagenr);
    };

    if (pages.length !== shouldBe) {
    }

    return (
        <HStack mt={6} spacing={1}>
            <PaginationButton fn={to(currentPage - 1)} isDisabled={currentPage === 1}>
                <MdChevronLeft />
            </PaginationButton>
            {!pages.includes(1) && (
                <PaginationButton fn={to(1)} isDisabled={currentPage === 1}>
                    1
                </PaginationButton>
            )}

            {pages.map((page) => (
                <PaginationButton key={page} fn={to(page)} isDisabled={currentPage === page}>
                    {page}
                </PaginationButton>
            ))}

            {!pages.includes(totalPages) && (
                <PaginationButton fn={to(totalPages)} isDisabled={currentPage === totalPages}>
                    {totalPages}
                </PaginationButton>
            )}

            <PaginationButton fn={to(currentPage + 1)} isDisabled={currentPage === totalPages}>
                <MdChevronRight />
            </PaginationButton>
        </HStack>
    );
};
