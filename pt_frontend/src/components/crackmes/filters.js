import { Box, Checkbox, Code, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { STATUS_SOLVED, statusDesc } from './consts';
import Select, { components } from 'react-select';
import debounce from 'debounce';
import { useDispatch } from 'react-redux';
import { updateFilters as updateFilters } from '../../context/crackmesReducer';

const statusesOptions = Object.keys(statusDesc).map((k) => {
    return { value: parseInt(k, 10), label: statusDesc[k].toLowerCase() };
});

const customStyles = {
    option: (provided, state) => {
        return {
            ...provided,
            color: 'black'
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black'
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: 'black'
    }),
    singleValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'black'
    })
};

const sortOptions = [
    { value: 'name-asc', label: 'by name (asc)' },
    { value: 'name-desc', label: 'by name (desc)' },
    { value: 'date-asc', label: 'by date (asc)' },
    { value: 'date-desc', label: 'by date (desc)' },
    { value: 'comments-asc', label: 'by comments num (asc)' },
    { value: 'comments-desc', label: 'by comments num (desc)' },
    { value: 'writeups-asc', label: 'by writeups num (asc)' },
    { value: 'writeups-desc', label: 'by writeups num (desc)' }
];

export const DEFAULT_SORT_OPTION = sortOptions[0];

const Control = ({ children, ...props }) => {
    const { label } = props.selectProps;
    return (
        <components.Control {...props}>
            <span style={{ color: 'black', paddingLeft: 5, fontWeight: 'bold' }}>{label}</span>
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
        dispatch(updateFilters({ searchTerm: term }));
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
                        placeholder="Filter by status task"
                        closeMenuOnSelect={false}
                        isSearchable={false}
                        defaultValue={statusesOptions.filter((opt) => parseInt(opt.value, 10) !== STATUS_SOLVED)}
                        selectedOptionStyle="check"
                        components={{ Control }}
                        label={'Status:'}
                        styles={customStyles}
                        onChange={onStatusChanged}
                    />
                </Box>
                <Box w={'40%'}>
                    <Select
                        name="sort"
                        options={sortOptions}
                        placeholder="Sort"
                        isSearchable={false}
                        defaultValue={DEFAULT_SORT_OPTION}
                        components={{ Control }}
                        label={'Sort'}
                        styles={customStyles}
                        onChange={onSortMethodChanged}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};
