import { Accordion, Box, Flex, Text } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { crackmesFilters, resetFilters } from './redux/crackmesReducer';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_CLEAR } from './const/consts';
import { getSortOption } from './const/filtersConsts';
import { useEffect, useState } from 'react';
import { Paginate } from './paginate';
import { usePagination } from './hooks/hooks';

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

const perPage = 40;

export const CrackmesList = ({ tasksWithActions }) => {
    //FIXME, when updating crackme action and having filters set, crackme disappears from the list (it is excluded by the filters)
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);

    const [expandedItems, setExpandedItems] = useState({});
    const filters = useSelector(crackmesFilters);
    const { filterStatuses, searchTerm, sortMethod } = filters;
    const { page, setPage } = usePagination();

    useEffect(() => {
        // set the initial data set and reset the filters
        dispatch(resetFilters())
        setTasks(tasksWithActions);
    }, [dispatch, tasksWithActions]);

    useEffect(() => {
        // set first page after filtering (if not already there)
        if (page !== 1) {
            setPage(1);
        }
        setExpandedItems({}); // clear expended items after filtering
    }, [dispatch, filterStatuses.length, searchTerm, sortMethod]);

    let filteredTasks = filterTasks(tasks, filters);
    if (filteredTasks.length === 0) {
        return <EmptyList />;
    }

    const totalPages = Math.ceil(filteredTasks.length / perPage);
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;

    const updateTask = (taskid, action) => {
        const index = tasks.findIndex((t) => t.id === taskid);
        const newTasks = [...tasks];
        newTasks[index].actions.unshift(action);
        newTasks[index].lastAction = action;
        setTasks(newTasks);
    };

    const updateOpenedItems = (opened_items) => {
        setExpandedItems({ ...expandedItems, [page]: opened_items });
    };

    return (
        <>
            <Text mb={5} mt={1}>
                {filteredTasks.length} results
            </Text>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
            <Flex
                textAlign='center'
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
                <Accordion w={'full'} allowToggle allowMultiple onChange={updateOpenedItems}
                           index={expandedItems[page] || []}>
                    {filteredTasks.slice(indexOfFirstItem, indexOfLastItem).map((t, i) => (
                        <Crackme crackme={t} updateTask={updateTask} key={indexOfFirstItem + i} />
                    ))}
                </Accordion>
            </Flex>
        </>
    );
};
