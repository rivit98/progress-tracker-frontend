import { Box, Flex, Input } from '@chakra-ui/react';
import Select, { components } from 'react-select';
import debounce from 'debounce';
import { useDispatch } from 'react-redux';
import { updateFilters } from './redux/crackmesReducer';
import {
    DEFAULT_SORT_OPTION,
    defaultFilterStatuses,
    getSortOption,
    selectFieldStyles,
    sortOptions,
    statusesOptions
} from './filterOpts';
import { STATUS_CLEAR } from '../generic/statuses';

const Control = ({ children, ...props }) => {
    const { label } = props.selectProps;
    return (
        <components.Control {...props}>
            <span style={{ color: 'black', paddingLeft: 5, fontWeight: 'bold', fontSize: '80%' }}>{label}</span>
            {children}
        </components.Control>
    );
};

export const Filters = () => {
    const dispatch = useDispatch();

    const onStatusChanged = (statuses) => {
        statuses = statuses.map((v) => v['value']);
        dispatch(updateFilters({ filterStatuses: statuses }));
    };

    const onSearchTermChanged = (event) => {
        const term = event.target.value;
        dispatch(updateFilters({ searchTerm: term.toLowerCase() }));
    };

    const onSortMethodChanged = (method) => {
        dispatch(updateFilters({ sortMethod: method.value }));
    };

    return (
        <Flex maxW={'xl'} w={'full'} flexDir={'column'} mx={'auto'}>
            <Input placeholder={'Search by name'} onChange={debounce((event) => onSearchTermChanged(event), 300)} />
            <Flex mt={2} direction={'column'} experimental_spaceY={1}>
                <Box>
                    <Select
                        name="sort"
                        options={sortOptions}
                        isSearchable={false}
                        defaultValue={DEFAULT_SORT_OPTION}
                        components={{ Control }}
                        label={'Sort by'}
                        styles={selectFieldStyles}
                        onChange={onSortMethodChanged}
                    />
                </Box>
                <Box>
                    <Select
                        isMulti
                        name="statuses"
                        options={statusesOptions}
                        isSearchable={false}
                        components={{ Control }}
                        label={'Status:'}
                        styles={selectFieldStyles}
                        onChange={onStatusChanged}
                        defaultValue={defaultFilterStatuses}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};

export const filterTasks = (tasks, { filterStatuses, searchTerm, sortMethod }) => {
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
