import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import {
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
import { statusDesc, statusIcon } from './consts';
import { ActionsList, CrackmeActionsNotLogged } from './actions';

export const Crackme = ({ crackme, updateTask }) => {
    const logged = useSelector(isLoggedIn);
    let { date, name, lastAction } = crackme;
    const lastActionStatus = lastAction && lastAction.status;

    return (
        <AccordionItem border={0} maxW={'xl'} w={'full'} mx={'auto'} textAlign={'center'} isDisabled={false}>
            <AccordionButton
                px={0}
                _hover={{
                    background: 'blackAlpha.600',
                    color: 'teal.500'
                }}
                rounded="md"
            >
                <Flex flexDirection={'row'} justifyContent={'space-between'} experimental_spaceX={'2'} w={'full'}>
                    <Box ml={1} flex={8} overflow={'hidden'} textAlign="left">
                        {lastActionStatus && lastActionStatus !== 0 && (
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
            <AccordionPanel pb={4} w={'full'}>
                {logged ? <ActionsList crackme={crackme} updateTask={updateTask} /> : <CrackmeActionsNotLogged />}
            </AccordionPanel>
        </AccordionItem>
    );
};
