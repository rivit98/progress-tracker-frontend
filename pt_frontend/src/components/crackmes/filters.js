import { Box, Flex, Input } from '@chakra-ui/react';
import { STATUS_SOLVED } from './consts';
import Select, { components } from 'react-select';
import debounce from 'debounce';
import { useDispatch } from 'react-redux';
import { updateFilters as updateFilters } from '../../context/crackmesReducer';
import { DEFAULT_SORT_OPTION, selectFieldStyles, sortOptions, statusesOptions } from './filtersConsts';

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
        method = method.value;
        dispatch(updateFilters({ sortMethod: method }));
    };

    return (
        <Flex maxW={'xl'} w={'full'} flexDir={'column'} mx={'auto'} mb={10}>
            <Input placeholder={'Search by name'} onChange={debounce((event) => onSearchTermChanged(event), 500)} />
            <Flex mt={2} experimental_spaceX={2}>
                <Box w={'60%'}>
                    <Select
                        isMulti
                        name="statuses"
                        options={statusesOptions}
                        isSearchable={false}
                        components={{ Control }}
                        label={'Status:'}
                        styles={selectFieldStyles}
                        onChange={onStatusChanged}
                        defaultValue={statusesOptions.filter((opt) => opt.value !== STATUS_SOLVED)}
                    />
                </Box>
                <Box w={'40%'}>
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
            </Flex>
        </Flex>
    );
};
