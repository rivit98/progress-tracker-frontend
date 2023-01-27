import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    Box,
    Text,
    Hide,
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { statusBadge, STATUS_CLEAR } from '../generic/statuses';
import { ActionsList } from './actions';

export const Crackme = ({ crackme, updateTask }) => {
    const { date, name, lastAction, id } = crackme;
    const lastActionStatus = lastAction && lastAction.status;

    return (
        <AccordionItem
            border={0}
            maxW={'xl'}
            w={'full'}
            mx={'auto'}
            textAlign={'center'}
            isDisabled={false}
            id={`crackme-${id}`}
        >
            <AccordionButton
                _hover={{
                    background: 'blackAlpha.600',
                    color: 'teal.500'
                }}
                rounded="md"
            >
                <HStack ml={1} flex={8} overflow={'hidden'}>
                    <Text noOfLines={1} textAlign={'left'}>
                        {name}
                    </Text>
                    <Hide below={'sm'}>
                        {lastActionStatus !== STATUS_CLEAR && statusBadge[lastActionStatus]}
                    </Hide>
                </HStack>
                <Box flex={3} overflow={'hidden'}>
                    {formatDate(date)}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2} w={'full'} mb={2}>
                <ActionsList crackme={crackme} updateTask={updateTask} />
            </AccordionPanel>
        </AccordionItem>
    );
};
