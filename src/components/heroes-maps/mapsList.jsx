import { Accordion, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { hasPermissions, HEROES_MAPS_SPECIAL_PERMS, isLoggedIn, userGroups } from '../../context/userReducer';
import { NotLoggedInfo } from '../generic/notLoggedBanner';
import { Paginate } from '../generic/paginate';
import { AddMap } from './addMap';
import { ITEMS_PER_PAGE } from './config';
import { defaultFilters, filterItems, Filters } from './filters';
import { Map } from './map';

export const MapsList = ({ itemsWithActions }) => {
    const logged = useSelector(isLoggedIn);
    const groups = useSelector(userGroups);
    const hasSpecialPerms = hasPermissions(groups, [HEROES_MAPS_SPECIAL_PERMS]);

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

    const updateItem = (message) => {
        const { type, payload } = message;

        if (type === 'delete') {
            const itemId = payload;
            const index = filteredItems.findIndex((item) => item.id === itemId);
            setExpandedItems(expandedItems.filter((idx) => idx !== index));
            setItems(items.filter((item) => item.id !== itemId));
        } else if (type === 'add') {
            setItems([...items, payload]);
        } else if (type === 'newaction') {
            const { itemId, action } = payload;
            const index = items.findIndex((item) => item.id === itemId);
            const newItems = [...items];
            newItems[index].actions.unshift(action);
            newItems[index].lastAction = action;
            const isFilteredOut = filterItems([newItems[index]], filters).length === 0;
            if (isFilteredOut) {
                const itemIndex = filteredItems.findIndex((item) => item.id === itemId);
                setExpandedItems(expandedItems.filter((idx) => idx !== itemIndex));
            }
            setItems(newItems);
        } else if (type === 'update') {
            const { id: itemId } = payload;
            const index = items.findIndex((item) => item.id === itemId);
            const newItems = [...items];
            newItems[index] = { ...newItems[index], ...payload };
            setItems(newItems);
        }
    };

    const updateOpenedItems = (opened_items) => {
        setExpandedItems(opened_items);
    };

    return (
        <>
            <Filters updateFilters={updateFilters} />
            <Flex experimental_spaceX={2} my={1}>
                {hasSpecialPerms && <AddMap updateFunc={updateItem} />}
            </Flex>
            {!logged && <NotLoggedInfo />}
            <Text mb={5} mt={1}>
                {filteredItems.length} results
            </Text>
            <Flex w="full" justifyContent="center" flexDirection="column">
                <Accordion allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems}>
                    {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
                        <Map item={item} updateFunc={updateItem} key={item.id} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
