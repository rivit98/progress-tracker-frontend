import { Accordion, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Crackme } from './crackme';
import { Paginate } from '../generic/paginate';
import { defaultFilters, Filters, filterItems } from './filters';
import { isLoggedIn } from '../../context/userReducer';
import { NotLoggedInfo } from '../generic/notLoggedBanner';
import { ITEMS_PER_PAGE } from './config';

export const CrackmesList = ({ itemsWithActions }) => {
    const logged = useSelector(isLoggedIn);
    const [items, setItems] = useState(itemsWithActions);

    const [expandedItems, setExpandedItems] = useState([]);
    const [filters, setFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);

    const updateFilters = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    useEffect(() => {
        // set first page after filtering
        setPage(1);
    }, [filters]);

    useEffect(() => {
        // clear expended items after filtering and page change
        setExpandedItems([]);
    }, [page, filters]);

    const filteredItems = filterItems(items, filters);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const indexOfLastItem = page * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const updateItem = (taskid, action) => {
        const index = items.findIndex((item) => item.id === taskid);
        const newItems = [...items];
        newItems[index].actions.unshift(action);
        newItems[index].lastAction = action;
        setItems(newItems);
        const isFilteredOut = filterItems([newItems[index]], filters).length === 0;
        if (isFilteredOut) {
            const itemIndex = filteredItems.findIndex((item) => item.id === taskid);
            setExpandedItems(expandedItems.filter((idx) => idx !== itemIndex));
        }
    };

    const updateOpenedItems = (opened_items) => {
        setExpandedItems(opened_items);
    };

    return (
        <>
            <Filters updateFilters={updateFilters} />
            {!logged && <NotLoggedInfo />}
            <Text mb={5} mt={1}>
                {filteredItems.length} results
            </Text>
            <Flex w="full" justifyContent="center" flexDirection="column">
                <Accordion allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems}>
                    {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
                        <Crackme crackme={item} updateFunc={updateItem} key={item.id} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
