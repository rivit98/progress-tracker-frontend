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
import { arabToRoman } from 'roman-numbers';
import { statusBadge, STATUS_CLEAR } from '../generic/statuses';
import { ActionsList } from './actions';

export const Map = ({ item, updateFunc }) => {
    const { name, heroes_version, lastAction, id } = item;
    const lastActionStatus = lastAction && lastAction.status;

    return (
        <AccordionItem border={0} maxW="xl" w="full" mx="auto" textAlign="center" id={`item-${id}`}>
            <AccordionButton
                _hover={{
                    background: 'blackAlpha.600',
                    color: 'teal.500',
                }}
                rounded="md"
            >
                <HStack ml={1} flex={8} overflow="hidden">
                    <Text noOfLines={1} textAlign="left">
                        {name}
                    </Text>
                    <Hide below="sm">{lastActionStatus !== STATUS_CLEAR && statusBadge[lastActionStatus]}</Hide>
                </HStack>
                <Box flex={3} overflow="hidden">
                    {arabToRoman(heroes_version)}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                <ActionsList item={item} updateFunc={updateFunc} />
            </AccordionPanel>
        </AccordionItem>
    );
};
