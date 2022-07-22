import { Box, Flex, Text } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { crackmesFilters } from './redux/crackmesReducer';
import { useSelector } from 'react-redux';
import { STATUS_CLEAR } from './const/consts';
import { getSortOption } from './const/filtersConsts';
import { useEffect, useState } from 'react';
import { Paginate } from './paginate';
import { usePagination } from './hooks/hooks';
import AccordionMultipage from '../chakra-reimplemented/AccordionMultipage';

const filterTasks = (tasks, { filterStatuses, searchTerm, sortMethod }) => {
    let filteredTasks = [...tasks];
    if (searchTerm.length > 2) {
        filteredTasks = filteredTasks.filter((t) => t.name.toLowerCase().includes(searchTerm));
    }

    if (filterStatuses.length > 0) {
        if (filterStatuses.includes(STATUS_CLEAR)) {
            // task has no actions (or cleared state)
            filteredTasks = filteredTasks.filter(
                (t) => t.lastAction === undefined || filterStatuses.includes(t.lastAction.status)
            );
        } else {
            filteredTasks = filteredTasks.filter((t) => t.lastAction && filterStatuses.includes(t.lastAction.status));
        }
    }

    filteredTasks = filteredTasks.sort(getSortOption(sortMethod).sortFn);
    return filteredTasks;
};

const EmptyList = () => {
    return (
        <Box w={'full'} maxW={'xl'} mx={'auto'} mb={20} mt={10} fontWeight={'bold'} fontSize={'lg'}>
            <Text align={'center'}>No tasks matching your search criteria</Text>
        </Box>
    );
};

export const CrackmesList = ({ tasksWithActions }) => {
    //FIXME, when updating crackme action and having filters set, crackme dissapears from the list (it is excluded by the filters)
    const [tasks, setTasks] = useState([]);
    const { page, setPage, totalPages, indexOfFirstPage, indexOfLastPage } = usePagination({
        totalItems: tasks.length
    });
    const filters = useSelector(crackmesFilters);
    const { filterStatuses, searchTerm, sortMethod } = filters;

    useEffect(() => {
        setTasks(tasksWithActions);
    }, [tasksWithActions]);

    useEffect(() => {
        if (page !== 1) {
            setPage(1);
        }
    }, [filterStatuses.length, searchTerm, sortMethod]);

    let filteredTasks = filterTasks(tasks, filters);
    if (filteredTasks.length === 0) {
        return <EmptyList />;
    }

    const updateTask = (taskid, action) => {
        const index = tasks.findIndex((t) => t.id === taskid);
        const newTasks = [...tasks];
        newTasks[index].actions.unshift(action);
        newTasks[index].lastAction = action;
        setTasks(newTasks);
    };

    return (
        <>
            <Text mb={5} mt={1}>
                {filteredTasks.length} results
            </Text>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                maxW={'xl'}
                mx={'auto'}
                mb={2}
                mt={7}
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
            <Flex w={'full'} justifyContent={'center'} flexDirection={'column'}>
                <AccordionMultipage w={'full'} allowToggle allowMultiple>
                    {filteredTasks.slice(indexOfFirstPage, indexOfLastPage).map((t, i) => (
                        <Crackme crackme={t} updateTask={updateTask} key={indexOfFirstPage + i} />
                    ))}
                </AccordionMultipage>
            </Flex>
        </>
    );
};
