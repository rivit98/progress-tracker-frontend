import { Accordion, Box, Flex, Text } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { UpdateSummary } from './summary';
import { crackmesFilters } from '../../context/crackmesReducer';
import { useSelector } from 'react-redux';
import { STATUS_CLEAR } from './consts';
import { getSortOption, sortOptions } from './filtersConsts';
import { useState } from 'react';
import { Paginate } from './paginate';

export const ListRenderer = ({ tasksWithActions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { filterStatuses, searchTerm, sortMethod } = useSelector(crackmesFilters);

    let tasks = tasksWithActions;
    if (searchTerm.length > 2) {
        tasks = tasks.filter((t) => t.name.toLowerCase().includes(searchTerm));
    }

    if (filterStatuses.length > 0) {
        if (filterStatuses.includes(STATUS_CLEAR)) {
            // task has no actions (or cleared state)
            tasks = tasks.filter((t) => t.lastAction === undefined || filterStatuses.includes(t.lastAction.status));
        } else {
            tasks = tasks.filter((t) => t.lastAction).filter((t) => filterStatuses.includes(t.lastAction.status));
        }
    }

    if (tasks.length === 0) {
        return (
            <>
                <Box w={'full'} maxW={'xl'} mx={'auto'} mb={2} fontWeight={'bold'} fontSize={'lg'}>
                    <Text align={'center'}>No tasks match your serch criteria</Text>
                </Box>
                <UpdateSummary />
            </>
        );
    }

    tasks = tasks.sort(getSortOption(sortMethod).sortFn);

    const perPage = 30;
    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const totalPages = Math.ceil(tasks.length / perPage);
    if (currentPage > totalPages) {
        setCurrentPage(1);
    }

    return (
        <>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                maxW={'xl'}
                mx={'auto'}
                mb={2}
                fontWeight={'bold'}
                experimental_spaceX={'2'}
                fontSize={'lg'}
            >
                <Box flex={8} overflow={'hidden'}>
                    Task name
                </Box>
                <Box flex={3} overflow={'hidden'}>
                    Date
                </Box>
                <Box w={'20px'} />
            </Flex>
            <Flex w={'full'} justifyContent={'center'}>
                <Accordion allowToggle w={'full'}>
                    {tasks.slice(indexOfFirstPage, indexOfLastPage).map((t) => (
                        <Crackme crackme={t} key={t.id} />
                    ))}
                </Accordion>
            </Flex>
            {totalPages > 1 && (
                <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            )}

            <UpdateSummary />
        </>
    );
};
