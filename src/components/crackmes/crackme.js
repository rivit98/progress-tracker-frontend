import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { statusBadge } from './const/statuses';
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
                px={0}
                _hover={{
                    background: 'blackAlpha.600',
                    color: 'teal.500'
                }}
                rounded="md"
            >
                <Flex flexDirection={'row'} justifyContent={'space-between'} experimental_spaceX={'2'} w={'full'}>
                    <HStack ml={1} flex={8} overflow={'hidden'} textAlign="left">
                        <Text d={'inline'} noOfLines={1}>
                            {name}
                        </Text>
                        {statusBadge[lastActionStatus]}
                    </HStack>
                    <Box flex={3} overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box w={'20px'} textAlign="right" justifyContent={'end'} mr={2}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} w={'full'} mb={2}>
                {logged ? <ActionsList crackme={crackme} updateTask={updateTask} /> : <CrackmeActionsNotLogged />}
            </AccordionPanel>
        </AccordionItem>
    );
};
