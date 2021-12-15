import { Box, Button, Flex, HStack } from '@chakra-ui/react';

const PaginationButton = ({ children, ...props }) => {
    return (
        <Button size={'xs'} m={0} colorScheme={'teal'} {...props}>
            {children}
        </Button>
    );
};

export const Paginate = ({ currentPage, setCurrentPage, totalPosts, postPerPage }) => {
    const totalPages = Math.ceil(totalPosts / postPerPage);

    let pages = [];
    for (let p = 1; p <= totalPages; p++) {
        pages.push(p);
    }

    return (
        <HStack mt={6} spacing={1}>
            <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage - 1 <= 0}>
                &laquo;
            </PaginationButton>
            {pages.map((page) => (
                <PaginationButton key={page} onClick={() => setCurrentPage(page)} isDisabled={currentPage === page}>
                    {page}
                </PaginationButton>
            ))}
            <PaginationButton
                onClick={() => setCurrentPage(currentPage + 1)}
                isDisabled={currentPage + 1 >= totalPages}
            >
                &raquo;
            </PaginationButton>
        </HStack>
    );
};
