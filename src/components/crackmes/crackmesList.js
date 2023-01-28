import { Accordion, Flex, Text } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paginate } from '../generic/paginate';
import { defaultFilters, Filters, filterTasks } from './filters';
import { isLoggedIn } from '../../context/userReducer';
import { NotLoggedInfo } from '../generic/notLoggedBanner';
import { EmptyResultSet } from '../generic/emptyResultSet';

const perPage = 40;

export const CrackmesList = ({ tasksWithActions }) => {
    const logged = useSelector(isLoggedIn);
    const [tasks, setTasks] = useState([]);

    const [expandedItems, setExpandedItems] = useState({});
    const [filters, setFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);

    const updateFilters = (newFilters) => {
        setFilters({...filters, ...newFilters})
    }

    useEffect(() => {
        // set the initial data set and reset the filters
        setFilters(defaultFilters)
        setTasks(tasksWithActions);
    }, [tasksWithActions]);

    useEffect(() => {
        // set first page after filtering (if not already there)
        if (page !== 1) {
            setPage(1);
        }
        setExpandedItems({}); // clear expended items after filtering
    }, [filters]);

    let filteredTasks = filterTasks(tasks, filters);
    if (filteredTasks.length === 0) {
        return <EmptyResultSet />;
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
            <Filters updateFilters={updateFilters} />
            {!logged && <NotLoggedInfo/>}
            <Text mb={5} mt={1}>
                {filteredTasks.length} results
            </Text>
            <Flex w={'full'} justifyContent={'center'} flexDirection={'column'}>
                <Accordion allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems[page] || []}>
                    {filteredTasks.slice(indexOfFirstItem, indexOfLastItem).map((t, i) => (
                        <Crackme crackme={t} updateTask={updateTask} key={indexOfFirstItem + i} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
