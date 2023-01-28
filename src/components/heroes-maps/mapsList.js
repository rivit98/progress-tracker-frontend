import { Accordion, Alert, AlertIcon, Box, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Paginate } from '../generic/paginate';
import { Map } from './map';
import { heroesMapsService } from '../../services/heroesMaps';
import { isLoggedIn } from '../../context/userReducer';
import { NotLoggedInfo } from '../generic/notLoggedBanner';
import { EmptyResultSet } from '../generic/emptyResultSet';

const perPage = 40;

export const MapsList = ({ itemsWithActions }) => {
    //FIXME, when updating crackme action and having filters set, crackme disappears from the list (it is excluded by the filters)
    const dispatch = useDispatch();
    const logged = useSelector(isLoggedIn);
    const [items, setItems] = useState([]);

    const [expandedItems, setExpandedItems] = useState({});
    // const filters = useSelector(crackmesFilters);
    // const { filterStatuses, searchTerm, sortMethod } = filters;
    const [page, setPage] = useState(1);

    useEffect(() => {
        // set the initial data set and reset the filters
        // dispatch(resetFilters())
        setItems(itemsWithActions);
    }, [dispatch, itemsWithActions]);

    // useEffect(() => {
    //     // set first page after filtering (if not already there)
    //     if (page !== 1) {
    //         setPage(1);
    //     }
    //     setExpandedItems({}); // clear expended items after filtering
    // }, [dispatch, filterStatuses.length, searchTerm, sortMethod]);

    // let filteredItems = filterTasks(maps, filters);
    const filteredItems = itemsWithActions;

    if (filteredItems.length === 0) {
        return <EmptyResultSet />;
    }

    const totalPages = Math.ceil(filteredItems.length / perPage);
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;

    const updateItem = (mapid, action) => {
        const index = items.findIndex((t) => t.id === mapid);
        const newMaps = [...items];
        newMaps[index].actions.unshift(action);
        newMaps[index].lastAction = action;
        setItems(newMaps);
    };

    const updateOpenedItems = (opened_items) => {
        setExpandedItems({ ...expandedItems, [page]: opened_items });
    };

    return (
        <>
            {!logged && <NotLoggedInfo/>}

            <Text mb={5} mt={1}>
                {filteredItems.length} results
            </Text>
            <Flex w={'full'} justifyContent={'center'} flexDirection={'column'}>
                <Accordion allowToggle allowMultiple onChange={updateOpenedItems} index={expandedItems[page] || []}>
                    {filteredItems.slice(indexOfFirstItem, indexOfLastItem).map((item, i) => (
                        <Map item={item} updateFunc={updateItem} key={indexOfFirstItem + i} />
                    ))}
                </Accordion>
            </Flex>
            <Paginate totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    );
};
