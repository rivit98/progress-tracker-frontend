import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    Box,
    Text,
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { statusBadge, STATUS_CLEAR } from './const/statuses';
import { ActionsList, CrackmeActionsNotLogged } from './actions';

export const Crackme = ({ crackme, updateTask }) => {
    const logged = useSelector(isLoggedIn);
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
                    <Text noOfLines={1}>
                        {name}
                    </Text>
                    {lastActionStatus !== STATUS_CLEAR && statusBadge[lastActionStatus]}
                </HStack>
                <Box flex={3} overflow={'hidden'}>
                    {formatDate(date)}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2} w={'full'} mb={2}>
                {logged ? <ActionsList crackme={crackme} updateTask={updateTask} /> : <CrackmeActionsNotLogged />}
            </AccordionPanel>
        </AccordionItem>
    );
};
