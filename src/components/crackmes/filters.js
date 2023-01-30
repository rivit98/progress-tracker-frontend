import { Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import Select, { components } from 'react-select';
import debounce from 'debounce';

import { statusesOptions, STATUS_CLEAR } from '../generic/statuses';
import { defaultFilterStatuses, DEFAULT_SORT_OPTION } from './config';
import { getSortOption, sortOptions } from './filterOpts';
import { selectFieldStyles } from '../generic/filters';
import { Search2Icon } from '@chakra-ui/icons';

export const defaultFilters = {
    filterStatuses: defaultFilterStatuses.map((v) => v['value']),
    searchTerm: '',
    sortMethod: DEFAULT_SORT_OPTION['value'],
};

const Control = ({ children, ...props }) => {
    const { label } = props.selectProps;
    return (
        <components.Control {...props}>
            <span style={{ color: 'black', paddingLeft: 5, fontWeight: 'bold', fontSize: '80%' }}>{label}</span>
            {children}
        </components.Control>
    );
};

export const Filters = ({ updateFilters }) => {
    const onStatusChanged = (statuses) => {
        statuses = statuses.map((v) => v['value']);
        updateFilters({ filterStatuses: statuses });
    };

    const onSearchTermChanged = (event) => {
        const term = event.target.value;
        updateFilters({ searchTerm: term.toLowerCase() });
    };

    const onSortMethodChanged = (method) => {
        updateFilters({ sortMethod: method.value });
    };

    return (
        <Flex maxW={'xl'} w={'full'} flexDir={'column'} mx={'auto'}>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
                <Input placeholder={'Search by name'} onChange={debounce((event) => onSearchTermChanged(event), 300)} />
            </InputGroup>
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
    let filteredItems = [...tasks];
    if (searchTerm.length > 2) {
        filteredItems = filteredItems.filter((t) => t.name.toLowerCase().includes(searchTerm));
    }

    if (filterStatuses.length > 0) {
        if (filterStatuses.includes(STATUS_CLEAR)) {
            // task has no actions (or cleared state)
            filteredItems = filteredItems.filter(
                (t) => t.lastAction === undefined || filterStatuses.includes(t.lastAction.status)
            );
        } else {
            filteredItems = filteredItems.filter((t) => t.lastAction && filterStatuses.includes(t.lastAction.status));
        }
    }

    filteredItems = filteredItems.sort(getSortOption(sortMethod).sortFn);
    return filteredItems;
};
