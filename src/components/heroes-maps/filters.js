import { Box, Flex, Input } from '@chakra-ui/react';
import Select, { components } from 'react-select';
import debounce from 'debounce';
import {
    defaultFilterStatuses,
    selectFieldStyles,
    statusesOptions
} from './filterOpts';
import { STATUS_CLEAR } from '../generic/statuses';

export const defaultFilters = {
    filterStatuses: defaultFilterStatuses.map((v) => v['value']),
    searchTerm: '',
}

const Control = ({ children, ...props }) => {
    const { label } = props.selectProps;
    return (
        <components.Control {...props}>
            <span style={{ color: 'black', paddingLeft: 5, fontWeight: 'bold', fontSize: '80%' }}>{label}</span>
            {children}
        </components.Control>
    );
};

export const Filters = ({updateFilters}) => {
    const onStatusChanged = (statuses) => {
        statuses = statuses.map((v) => v['value']);
        updateFilters({ filterStatuses: statuses });
    };

    const onSearchTermChanged = (event) => {
        const term = event.target.value;
        updateFilters({ searchTerm: term.toLowerCase() });
    };

    return (
        <Flex maxW={'xl'} w={'full'} flexDir={'column'} mx={'auto'}>
            <Input placeholder={'Search by name'} onChange={debounce((event) => onSearchTermChanged(event), 300)} />
            <Flex mt={2} direction={'column'} experimental_spaceY={1}>
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

export const filterItems = (maps, { filterStatuses, searchTerm }) => {
    let filteredMaps = [...maps];
    if (searchTerm.length > 2) {
        filteredMaps = filteredMaps.filter((t) => t.name.toLowerCase().includes(searchTerm));
    }

    if (filterStatuses.length > 0) {
        if (filterStatuses.includes(STATUS_CLEAR)) {
            // task has no actions (or cleared state)
            filteredMaps = filteredMaps.filter(
                (t) => t.lastAction === undefined || filterStatuses.includes(t.lastAction.status)
            );
        } else {
            filteredMaps = filteredMaps.filter((t) => t.lastAction && filterStatuses.includes(t.lastAction.status));
        }
    }

    return filteredMaps;
};
