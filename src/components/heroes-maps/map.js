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
    Hide,
} from '@chakra-ui/react';
import { statusBadge, STATUS_CLEAR } from '../generic/statuses';
import { ActionsList, ActionsNotLogged } from './actions';

export const Map = ({ item, updateFunc }) => {
    const logged = useSelector(isLoggedIn);
    const { name, heroes_version, lastAction, id } = item;
    const lastActionStatus = lastAction && lastAction.status;

    return (
        <AccordionItem
            border={0}
            maxW={'xl'}
            w={'full'}
            mx={'auto'}
            textAlign={'center'}
            isDisabled={false}
            id={`item-${id}`}
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
                    {heroes_version}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={2} w={'full'} mb={2}>
                {logged ? <ActionsList item={item} updateFunc={updateFunc} /> : <ActionsNotLogged />}
            </AccordionPanel>
        </AccordionItem>
    );
};
