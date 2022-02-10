import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Icon,
    Text,
    Tooltip
} from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { STATUS_CLEAR, statusDesc, statusIcon } from './const/consts';
import { ActionsList, CrackmeActionsNotLogged } from './actions';

export const Crackme = ({ crackme, updateTask }) => {
    const logged = useSelector(isLoggedIn);
    const { date, name, lastAction } = crackme;
    const lastActionStatus = lastAction && lastAction.status;

    return (
        // FIXME, Accordion should contain all items instead of one AccordionItem, but there is no way to reset expanded items
        <Accordion w={'full'} allowToggle={true}>
            <AccordionItem
                border={0}
                maxW={'xl'}
                w={'full'}
                mx={'auto'}
                textAlign={'center'}
                isDisabled={false}
                id={name}
            >
                <h2>
                    <AccordionButton
                        px={0}
                        _hover={{
                            background: 'blackAlpha.600',
                            color: 'teal.500'
                        }}
                        rounded="md"
                    >
                        <Flex
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                            experimental_spaceX={'2'}
                            w={'full'}
                        >
                            <Box ml={1} flex={8} overflow={'hidden'} textAlign="left">
                                {lastActionStatus && lastActionStatus !== STATUS_CLEAR && (
                                    <Tooltip label={statusDesc[lastActionStatus]}>
                                        <span>
                                            <Icon
                                                as={statusIcon[lastActionStatus].icon}
                                                color={statusIcon[lastActionStatus].color}
                                                mr={2}
                                                fontSize={statusIcon[lastActionStatus].size}
                                            />
                                        </span>
                                    </Tooltip>
                                )}
                                <Text d={'inline'} isTruncated={true}>
                                    {name}
                                </Text>
                            </Box>
                            <Box flex={3} overflow={'hidden'}>
                                {formatDate(date)}
                            </Box>
                            <Box w={'20px'} textAlign="right" justifyContent={'end'} mr={2}>
                                <AccordionIcon />
                            </Box>
                        </Flex>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} w={'full'} mb={2}>
                    {logged ? <ActionsList crackme={crackme} updateTask={updateTask} /> : <CrackmeActionsNotLogged />}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
