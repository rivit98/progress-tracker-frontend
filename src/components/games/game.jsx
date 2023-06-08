import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, HStack, Text, Hide } from '@chakra-ui/react';
import { statusBadge, STATUS_CLEAR } from '../generic/statuses';
import { ActionsList } from './actions';

export const Game = ({ item, updateFunc }) => {
    const { name, lastAction } = item;
    const lastActionStatus = lastAction && lastAction.status;

    return (
        <AccordionItem border={0} maxW="xl" w="full" mx="auto" textAlign="center">
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
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                <ActionsList item={item} updateFunc={updateFunc} />
            </AccordionPanel>
        </AccordionItem>
    );
};
