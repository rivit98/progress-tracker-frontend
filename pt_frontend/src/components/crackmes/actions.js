import { Box, Button, Flex, Link, List, ListIcon, ListItem, Select, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import formatDate from '../../utils/dateformatter';
import { MdArrowDropDown } from 'react-icons/all';
import { statusDesc, statusIcon } from './consts';

export const CrackmeActionsNotLogged = () => {
    return (
        <div>
            <Link as={ReactRouterLink} to={'/login'} mr={1} color={'teal.500'}>
                Log in
            </Link>
            to track progress
        </div>
    );
};

export const ActionsList = ({ crackme }) => {
    const { actions, comments_num, hexid, writeups_num } = crackme;
    const link = `https://crackmes.one/crackme/${hexid}`;

    return (
        <Box textAlign={'left'}>
            <Flex
                textAlign="center"
                flexDirection={'row'}
                justifyContent={'center'}
                w={'full'}
                mx={'auto'}
                mb={2}
                experimental_spaceX={'2'}
            >
                <Box flex={1} overflow={'hidden'} flexDirection={'row'} alignItems={'center'} experimental_spaceX={1}>
                    <Link href={link} isExternal color={'teal.500'}>
                        Challenge link
                    </Link>
                    <ExternalLinkIcon />
                </Box>
                <Box flex={1} overflow={'hidden'}>
                    Writeups:{' '}
                    <Text d="inline" fontWeight={'bold'}>
                        {writeups_num}
                    </Text>
                </Box>
                <Box flex={1} overflow={'hidden'}>
                    Comments:{' '}
                    <Text d="inline" fontWeight={'bold'}>
                        {comments_num}
                    </Text>
                </Box>
            </Flex>
            <List spacing={3} my={4}>
                {actions.map((a, index) => {
                    const status = a.status;
                    const { icon, color } = statusIcon[status];
                    return (
                        <ListItem key={index}>
                            <ListIcon as={icon} color={color} fontSize={'lg'} />
                            {formatDate(a.date, 'dd.mm.yyyy HH:MM:ss')} -- {statusDesc[status]}
                        </ListItem>
                    );
                })}
            </List>
            <Flex flexDirection={'row'} experimental_spaceX={2} mb={4}>
                <Select
                    icon={<MdArrowDropDown />}
                    w={'25%'}
                    size={'sm'}
                    border={0}
                    bg="gray.700"
                    color="whiteAlpha.500"
                >
                    <option value={'started'}>Start solving</option>
                    <option value={'aborted'}>Stop solving</option>
                    <option value={'solved'}>Mark as solved</option>
                    <option value={'ignored'}>Mark as ignored</option>
                </Select>
                <Button colorScheme="teal" fontSize={'md'} fontWeight={'normal'} size={'sm'}>
                    Update status
                </Button>
            </Flex>
        </Box>
    );
};
