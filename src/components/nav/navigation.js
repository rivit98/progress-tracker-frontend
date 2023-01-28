import {
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    Icon,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { FiHome, FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import React from 'react';
import { Link } from 'react-router-dom';
import { TopNavbar } from './topNavbar';
import { currentUserData, isLoggedIn, removeUser } from '../../context/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { VscKey } from 'react-icons/vsc';
import { FiMap } from 'react-icons/fi';

const hasPermissions = (userGroups, requiredPermissions) => {
    const groupNames = userGroups.map((g) => g.name);
    for (const perm of requiredPermissions) {
        if (!groupNames.includes(perm)) {
            return false;
        }
    }

    return true;
};

export function Navigation({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
    const logged = useSelector(isLoggedIn) || false;
    // const groups = useSelector(userGroups) || [];
    const { username } = useSelector(currentUserData);

    const linkItems = [
        { name: 'Home', to: '/', icon: FiHome },
        { name: 'Crackmes', to: '/crackmes', icon: VscKey },
        { name: 'Heroes maps', to: '/heroes-maps', icon: FiMap },
        { name: 'Login', to: '/login', icon: FiLogIn, show: !logged },
        { name: 'Register', to: '/register', icon: FiUserPlus, show: !logged },

        { name: 'Log out', to: '/', icon: FiLogOut, onClick: () => logOut(), show: logged }
    ];

    const logOut = () => {
        toast({
            title: '',
            description: 'Signed out',
            status: 'success',
            duration: 3000,
            isClosable: true
        });
        dispatch(removeUser());
    };

    return (
        <Box minH="100vh" bg={'blackAlpha.900'} color={'whiteAlpha.500'}>
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                size={'xs'}
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                closeOnEsc={true}
                closeOnOverlayClick={true}
                isFullHeight={true}
            >
                <DrawerOverlay />
                <DrawerContent overflowY={'auto'} bg={'gray.700'} color={'whiteAlpha.500'}>
                    <Flex h="20" w="full" alignItems="center" justify={'space-between'}>
                        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" ml={5}>
                            ProgressTracker
                        </Text>
                        <CloseButton mr={4} display={'flex'} onClick={onClose} />
                    </Flex>
                    {linkItems
                        .filter((link) => link.show === undefined || link.show === true)
                        // .filter(
                        //     (link) => link.requiredGroups === undefined || hasPermissions(groups, link.requiredGroups)
                        // )
                        .map((link) => (
                            <SideBarItem
                                key={link.name}
                                icon={link.icon}
                                to={link.to}
                                onClickActions={[onClose, link.onClick]}
                            >
                                {link.name}
                            </SideBarItem>
                        ))}
                    <Flex
                        align="end"
                        grow={1}
                        p="4"
                        mx="4"
                        borderRadius="lg"
                        role="group"
                        _focus={{
                            outline: 'none'
                        }}
                    >
                        <HStack align={'start'}>
                            <Text>Logged as:</Text>
                            {logged ? <Text fontWeight={'bold'}>{username}</Text> : <Text>nobody</Text>}
                        </HStack>
                    </Flex>
                </DrawerContent>
            </Drawer>
            <TopNavbar onOpen={onOpen} />
            <Box p="4" w="full">
                {children}
            </Box>
        </Box>
    );
}

const SideBarItem = ({ icon, children, to, onClickActions }) => {
    const onClickCall = () => {
        onClickActions.filter((a) => a).forEach((a) => a());
    };

    return (
        <Link to={to} onClick={onClickCall}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                cursor="pointer"
                _focus={{
                    outline: 'none'
                }}
                _hover={{
                    color: 'white'
                }}
            >
                {icon && <Icon mr="4" fontSize="16" as={icon} />}
                {children}
            </Flex>
        </Link>
    );
};
