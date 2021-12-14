import { Box, Checkbox, Code, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { STATUS_SOLVED, statusDesc } from './consts';
import Select, { components } from 'react-select';
import debounce from 'debounce';

const statusesOptions = Object.keys(statusDesc).map((k) => {
    return { value: k, label: statusDesc[k].toLowerCase() };
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
    const onStatusChanged = (statuses) => {
        statuses = statuses.map((v) => v['value']);
    };

    const onSearchTermChanged = (event) => {
        const term = event.target.value;
    };

    const onSortMethodChanged = (method) => {
        method = method.value;
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
                        defaultValue={sortOptions[0]}
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
