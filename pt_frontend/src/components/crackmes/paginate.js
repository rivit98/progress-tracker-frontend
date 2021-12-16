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
    const page = currentPage;
    const boundaryCount = 1;
    const count = totalPages;
    const hideNextButton = false;
    const hidePrevButton = false;
    const showFirstButton = false;
    const showLastButton = false;
    const siblingCount = 1;

    const handleClick = (value) => {
        setCurrentPage(value);
    };

    // https://dev.to/namirsab/comment/2050
    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
        Math.min(
            // Natural start
            page - siblingCount,
            // Lower boundary when page is high
            count - boundaryCount - siblingCount * 2 - 1
        ),
        // Greater than startPages
        boundaryCount + 2
    );

    const siblingsEnd = Math.min(
        Math.max(
            // Natural end
            page + siblingCount,
            // Upper boundary when page is low
            boundaryCount + siblingCount * 2 + 2
        ),
        // Less than endPages
        endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    const itemList = [
        ...(showFirstButton ? ['first'] : []),
        ...(hidePrevButton ? [] : ['previous']),
        ...startPages,

        // Start ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsStart > boundaryCount + 2
            ? ['start-ellipsis']
            : boundaryCount + 1 < count - boundaryCount
            ? [boundaryCount + 1]
            : []),

        // Sibling pages
        ...range(siblingsStart, siblingsEnd),

        // End ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsEnd < count - boundaryCount - 1
            ? ['end-ellipsis']
            : count - boundaryCount > boundaryCount
            ? [count - boundaryCount]
            : []),

        ...endPages,
        ...(hideNextButton ? [] : ['next']),
        ...(showLastButton ? ['last'] : [])
    ];

    // Map the button type to its page number
    const buttonPage = (type) => {
        switch (type) {
            case 'first':
                return 1;
            case 'previous':
                return page - 1;
            case 'next':
                return page + 1;
            case 'last':
                return count;
            default:
                return null;
        }
    };

    // Convert the basic item list to PaginationItem props objects
    const items = itemList.map((item) => {
        return typeof item === 'number'
            ? {
                  onClick: () => {
                      handleClick(item);
                  },
                  type: 'page',
                  page: item,
                  selected: item === page
              }
            : {
                  onClick: () => {
                      handleClick(buttonPage(item));
                  },
                  type: item,
                  page: buttonPage(item),
                  selected: false,
                  disabled:
                      item.indexOf('ellipsis') === -1 &&
                      (item === 'next' || item === 'last' ? page >= count : page <= 1)
              };
    });

    console.log(items);

    return (
        <HStack mt={6} spacing={1}>
            {items.map((item) => {
                const { type, selected, disabled, page, onClick } = item;
                switch (type) {
                    case 'page':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                {page}
                            </PaginationButton>
                        );
                    case 'first':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                {page}
                            </PaginationButton>
                        );
                    case 'previous':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                <MdChevronLeft />
                            </PaginationButton>
                        );
                    case 'next':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                <MdChevronRight />
                            </PaginationButton>
                        );
                    case 'last':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                {page}
                            </PaginationButton>
                        );
                    case 'start-ellipsis':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                ...
                            </PaginationButton>
                        );
                    case 'end-ellipsis':
                        return (
                            <PaginationButton fn={onClick} isDisabled={selected || disabled}>
                                ...
                            </PaginationButton>
                        );
                }
            })}
        </HStack>
    );
};
