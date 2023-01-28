import { Accordion, Flex, Text } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paginate } from '../generic/paginate';
import { defaultFilters, Filters, filterTasks } from './filters';
import { isLoggedIn } from '../../context/userReducer';
import { NotLoggedInfo } from '../generic/notLoggedBanner';
import { ITEMS_PER_PAGE } from './config';

export const CrackmesList = ({ itemsWithActions }) => {
    const logged = useSelector(isLoggedIn);
    const [items, setItems] = useState(itemsWithActions);

    const [expandedItems, setExpandedItems] = useState({});
    const [filters, setFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);

    const updateFilters = (newFilters) => {
        setFilters({...filters, ...newFilters})
    }

    useEffect(() => {
        // set first page after filtering (if not already there)
        if (page !== 1) {
            setPage(1);
        }
        setExpandedItems({}); // clear expended items after filtering
    }, [filters]);

    let filteredItems = filterTasks(items, filters);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const indexOfLastItem = page * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const updateItem = (taskid, action) => {
        const index = items.findIndex((item) => item.id === taskid);
        const newItems = [...items];
        newItems[index].actions.unshift(action);
        newItems[index].lastAction = action;
        setItems(newItems);
    };

    const updateOpenedItems = (opened_items) => {
        setExpandedItems({ ...expandedItems, [page]: opened_items });
    };

    return (
        <>
            <Filters updateFilters={updateFilters} />
            {!logged && <NotLoggedInfo/>}
            <Text mb={5} mt={1}>
                {filteredItems.length} results
            </Text>
            <Flex w={'full'} justifyContent={'center'} flexDirection={'column'}>
                <Accordion allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems[page] || []}>
                    {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((t, i) => (
                        <Crackme crackme={t} updateFunc={updateItem} key={indexOfFirstItem + i} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
