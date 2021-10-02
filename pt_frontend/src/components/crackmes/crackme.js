import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon } from '@chakra-ui/react';
import formatDate from '../../utils/dateformatter';
import { statusIcon } from './consts';
import { ActionsList, CrackmeActionsNotLogged } from './actions';

export const Crackme = ({ crackme }) => {
    const logged = useSelector(isLoggedIn);
    const { date, name, language, lastAction } = crackme;

    return (
        <AccordionItem border={0} maxW={'3xl'} w={'full'} mx={'auto'} textAlign={'center'} isDisabled={false}>
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
                        {lastAction && (
                            <Icon
                                as={statusIcon[lastAction.status].icon}
                                color={statusIcon[lastAction.status].color}
                                mr={1}
                            />
                        )}
                        {name}
                    </Box>
                    <Box flex={3} overflow={'hidden'}>
                        {formatDate(date)}
                    </Box>
                    <Box flex={4} overflow={'hidden'}>
                        {language}
                    </Box>
                    <Box w={'20px'} textAlign="right" justifyContent={'end'} mr={2}>
                        <AccordionIcon />
                    </Box>
                </Flex>
            </AccordionButton>
            <AccordionPanel pb={4} w={'full'}>
                {logged ? <ActionsList crackme={crackme} /> : <CrackmeActionsNotLogged />}
            </AccordionPanel>
        </AccordionItem>
    );
};
