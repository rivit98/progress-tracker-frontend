import { Accordion, Box, Flex, Text } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { crackmesFilters, resetFilters } from './redux/crackmesReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paginate } from '../generic/paginate';
import { filterTasks } from './filters';

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
    const [page, setPage] = useState(1);

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
            <Flex w={'full'} justifyContent={'center'} flexDirection={'column'}>
                <Accordion w={'full'} allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems[page] || []}>
                    {filteredTasks.slice(indexOfFirstItem, indexOfLastItem).map((t, i) => (
                        <Crackme crackme={t} updateTask={updateTask} key={indexOfFirstItem + i} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
