import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon } from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { statusIcon } from './consts';
import { ActionsList, CrackmeActionsNotLogged } from './actions';
import { useState } from 'react';

export const Crackme = ({ crackme }) => {
    const logged = useSelector(isLoggedIn);
    let { date, name, lastAction } = crackme;
    const [count, setCount] = useState(0);

    const updateLastAction = (a) => {
        crackme.lastAction = a;
        setCount(count + 1);
    };

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
                    <Box ml={1} flex={4} overflow={'hidden'} textAlign="left">
                        {lastAction && (
                            <Icon
                                as={statusIcon[lastAction.status].icon}
                                color={statusIcon[lastAction.status].color}
                                mr={1}
                            />
                        )}
                        {name}
                    </Box>
                    <Box flex={1} overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box w={'20px'} textAlign="right" justifyContent={'end'} mr={2}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} w={'full'}>
                {logged ? (
                    <ActionsList crackme={crackme} updateLastAction={updateLastAction} />
                ) : (
                    <CrackmeActionsNotLogged />
                )}
            </AccordionPanel>
        </AccordionItem>
    );
};
