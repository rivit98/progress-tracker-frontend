import { Accordion, Box, Flex } from '@chakra-ui/react';
import { Crackme } from './crackme';
import { UpdateSummary } from './summary';
import { crackmesFilters } from '../../context/crackmesReducer';
import { useSelector } from 'react-redux';
import { STATUS_CLEAR } from './consts';
import { sortOptions } from './filters';

export const ListRenderer = ({ tasksWithActions }) => {
    const { filterStatuses, searchTerm, sortMethod } = useSelector(crackmesFilters);

    let tasks = tasksWithActions;
    if (searchTerm.length > 2) {
        tasks = tasks.filter((t) => t.name.includes(searchTerm));
    }

    if (filterStatuses.length > 0) {
        if (filterStatuses.includes(STATUS_CLEAR)) {
            // task has no actions (or cleared state)
            tasks = tasks.filter((t) => t.lastAction === undefined || filterStatuses.includes(t.lastAction.status));
        } else {
            tasks = tasks.filter((t) => t.lastAction).filter((t) => filterStatuses.includes(t.lastAction.status));
        }
    }

    if (tasks.length === 0) {
        return (
            <Flex textAlign="center" w={'full'} maxW={'xl'} mx={'auto'} mb={2} fontWeight={'bold'} fontSize={'lg'}>
                empty
            </Flex>
        );
    }

    const sortFn = sortOptions.find((opt) => opt.value === sortMethod).sortFn;
    tasks = tasks.sort(sortFn);

    return (
        <>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'space-between'}
                w={'full'}
                maxW={'xl'}
                mx={'auto'}
                mb={2}
                fontWeight={'bold'}
                experimental_spaceX={'2'}
                fontSize={'lg'}
            >
                <Box flex={4} overflow={'hidden'}>
                    Task name
                </Box>
                <Box flex={1} overflow={'hidden'}>
                    Date
                </Box>
                <Box w={'20px'} />
            </Flex>
            <Flex w={'full'} justifyContent={'center'}>
                <Accordion allowToggle w={'full'}>
                    {tasks.slice(0, 50).map((t) => (
                        <Crackme crackme={t} key={t.id} />
                    ))}
                </Accordion>
            </Flex>
            <Flex mt={2}>pagination</Flex>
            <UpdateSummary />
        </>
    );
};
