import { Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import Select, { components } from 'react-select';
import debounce from 'debounce';
import { Search2Icon } from '@chakra-ui/icons';
import { statusesOptions, STATUS_CLEAR } from '../generic/statuses';
import { defaultFilterStatuses } from './config';
import { byName, selectFieldStyles } from '../generic/filters';

export const defaultFilters = {
    filterStatuses: defaultFilterStatuses.map((v) => v.value),
    searchTerm: '',
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
        updateFilters({ filterStatuses: statuses.map((v) => v.value) });
    };

    const onSearchTermChanged = (event) => {
        const term = event.target.value;
        updateFilters({ searchTerm: term.toLowerCase() });
    };

    return (
        <Flex maxW="xl" w="full" flexDir="column" mx="auto">
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <Search2Icon color="gray.300" />
                </InputLeftElement>
                <Input placeholder="Search by name" onChange={debounce((event) => onSearchTermChanged(event), 300)} />
            </InputGroup>
            <Flex mt={2} direction="column" experimental_spaceY={1}>
                <Box>
                    <Select
                        isMulti
                        name="statuses"
                        options={statusesOptions}
                        isSearchable={false}
                        components={{ Control }}
                        label="Status:"
                        styles={selectFieldStyles}
                        onChange={onStatusChanged}
                        defaultValue={defaultFilterStatuses}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};

export const filterItems = (games, { filterStatuses, searchTerm }) => {
    let filteredItems = games.filter((t) => t.name.toLowerCase().includes(searchTerm));

    if (filterStatuses.length > 0) {
        if (filterStatuses.includes(STATUS_CLEAR)) {
            filteredItems = filteredItems.filter(
                (t) => t.lastAction === undefined || filterStatuses.includes(t.lastAction.status)
            );
        } else {
            filteredItems = filteredItems.filter((t) => t.lastAction && filterStatuses.includes(t.lastAction.status));
        }
    }

    filteredItems = filteredItems.sort(byName);
    return filteredItems;
};
