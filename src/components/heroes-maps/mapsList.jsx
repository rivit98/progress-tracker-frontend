import { Accordion, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import { NotLoggedInfo } from '../generic/notLoggedBanner';
import { Paginate } from '../generic/paginate';
import { AddMap } from './addMap';
import { ITEMS_PER_PAGE } from './config';
import { defaultFilters, filterItems, Filters } from './filters';
import { Map } from './map';

export const MapsList = ({ itemsWithActions }) => {
    const logged = useSelector(isLoggedIn);
    // const groups = useSelector(userGroups) || [];

    const [items, setItems] = useState(itemsWithActions);

    const [expandedItems, setExpandedItems] = useState({});
    const [filters, setFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);

    const updateFilters = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    useEffect(() => {
        // set first page after filtering (if not already there)
        if (page !== 1) {
            setPage(1);
        }
        setExpandedItems({}); // clear expended items after filtering
    }, [filters]);

    const filteredItems = filterItems(items, filters);

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const indexOfLastItem = page * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const updateItem = (message) => {
        const { type, payload } = message;

        if (type === 'delete') {
            const itemId = payload;
            const index = filteredItems.findIndex((item) => item.id === itemId);
            setExpandedItems({ ...expandedItems, [page]: expandedItems[page].filter((idx) => idx !== index) });
            setItems(items.filter((item) => item.id !== itemId));
            return;
        }

        if (type === 'add') {
            setItems([...items, payload]);
            return;
        }

        if (type === 'newaction') {
            const { itemId, action } = payload;
            const index = items.findIndex((item) => item.id === itemId);
            const newItems = [...items];
            newItems[index].actions.unshift(action);
            newItems[index].lastAction = action;
            setItems(newItems);
            return;
        }

        if (type === 'update') {
            const { id: itemId } = payload;
            const index = items.findIndex((item) => item.id === itemId);
            const newItems = [...items];
            newItems[index] = { ...newItems[index], ...payload };
            setItems(newItems);
        }
    };

    const updateOpenedItems = (opened_items) => {
        setExpandedItems({ ...expandedItems, [page]: opened_items });
    };

    return (
        <>
            <Filters updateFilters={updateFilters} />
            <Flex experimental_spaceX={2} my={1}>
                <AddMap updateFunc={updateItem} />
            </Flex>
            {!logged && <NotLoggedInfo />}
            <Text mb={5} mt={1}>
                {filteredItems.length} results
            </Text>
            <Flex w="full" justifyContent="center" flexDirection="column">
                <Accordion allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems[page] || []}>
                    {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
                        <Map item={item} updateFunc={updateItem} key={item.id} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
