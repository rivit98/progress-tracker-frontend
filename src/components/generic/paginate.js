import { Button, Flex, HStack } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const PaginationButton = ({ children, fn, ...props }) => {
    return (
        <Button
            size={'xs'}
            w={8}
            m={0}
            colorScheme={'teal'}
            _focus={{ outline: 'none' }}
            _hover={{ bg: 'teal.300' }}
            onClick={fn}
            {...props}
        >
            {children}
        </Button>
    );
};

const Ellipsis = () => {
    return (
        <Flex size={'xs'} w={6} m={0} justifyContent={'center'}>
            ...
        </Flex>
    );
};

// code adapted from material UI pagination component
export const Paginate = ({ totalPages, currentPage, setCurrentPage }) => {
    if (totalPages <= 1) {
        return <></>;
    }

    const boundaryCount = 1;
    const siblingCount = 2;

    const handleClick = (value) => {
        setCurrentPage(value);
    };

    // https://dev.to/namirsab/comment/2050
    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, totalPages));
    const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

    const siblingsStart = Math.max(
        Math.min(
            // Natural start
            currentPage - siblingCount,
            // Lower boundary when page is high
            totalPages - boundaryCount - siblingCount * 2 - 1
        ),
        // Greater than startPages
        boundaryCount + 2
    );

    const siblingsEnd = Math.min(
        Math.max(
            // Natural end
            currentPage + siblingCount,
            // Upper boundary when page is low
            boundaryCount + siblingCount * 2 + 2
        ),
        // Less than endPages
        endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
    );

    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    const itemList = [
        ...['previous'],
        ...startPages,

        // Start ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsStart > boundaryCount + 2
            ? ['start-ellipsis']
            : boundaryCount + 1 < totalPages - boundaryCount
            ? [boundaryCount + 1]
            : []),

        // Sibling pages
        ...range(siblingsStart, siblingsEnd),

        // End ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsEnd < totalPages - boundaryCount - 1
            ? ['end-ellipsis']
            : totalPages - boundaryCount > boundaryCount
            ? [totalPages - boundaryCount]
            : []),

        ...endPages,
        ...['next']
    ];

    // Map the button type to its page number
    const buttonPage = (type) => {
        switch (type) {
            case 'first':
                return 1;
            case 'previous':
                return currentPage - 1;
            case 'next':
                return currentPage + 1;
            case 'last':
                return totalPages;
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
                  selected: item === currentPage
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
                      (item === 'next' || item === 'last' ? currentPage >= totalPages : currentPage <= 1)
              };
    });

    return (
        <HStack mt={4} spacing={1}>
            {items.map((item, index) => {
                const { type, selected, disabled, page, onClick } = item;
                const isDisabled = selected || disabled;
                switch (type) {
                    case 'page':
                    case 'first':
                    case 'last':
                        return (
                            <PaginationButton key={index} fn={onClick} isDisabled={isDisabled}>
                                {page}
                            </PaginationButton>
                        );
                    // case 'previous':
                    //     return (
                    //         <PaginationButton key={index} fn={onClick} isDisabled={isDisabled}>
                    //             <MdChevronLeft />
                    //         </PaginationButton>
                    //     );
                    // case 'next':
                    //     return (
                    //         <PaginationButton key={index} fn={onClick} isDisabled={isDisabled}>
                    //             <MdChevronRight />
                    //         </PaginationButton>
                    //     );
                    case 'start-ellipsis':
                    case 'end-ellipsis':
                        return <Ellipsis key={index} />;
                    default:
                        return <span key={index}></span>
                }
            })}
        </HStack>
    );
};
