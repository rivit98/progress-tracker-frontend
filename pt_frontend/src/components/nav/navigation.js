import {
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { FiHome, FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import React from 'react';
import { Link } from 'react-router-dom';
import { TopNavbar } from './topNavbar';
import { isLoggedIn, removeUser } from '../../context/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { VscKey } from 'react-icons/all';

export function Navigation({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
    const logged = useSelector(isLoggedIn);

    const linkItems = [
        { name: 'Home', to: '/', icon: FiHome },
        { name: 'Login', to: '/login', icon: FiLogIn, show: !logged },
        { name: 'Register', to: '/register', icon: FiUserPlus, show: !logged },

        { name: 'crackmes', to: '/crackmes', icon: VscKey, show: logged},

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
        <Box minH="100vh" bg={'gray.300'}>
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
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Flex h="20" w="full" alignItems="center" justify={'space-between'}>
                        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" ml={5}>
                            ProgressTracker
                        </Text>
                        <CloseButton mr={4} display={'flex'} onClick={onClose} />
                    </Flex>
                    {linkItems.filter((link) => link.show === undefined || link.show === true).map((link) => (
                        <SideBarItem
                            key={link.name}
                            icon={link.icon}
                            to={link.to}
                            onClickActions={[onClose, link.onClick]}
                        >
                            {link.name}
                        </SideBarItem>
                    ))}
                </DrawerContent>
            </Drawer>
            <TopNavbar onOpen={onOpen} />
            <Box p="4" w="full">{children}</Box>
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
                role="group"
                cursor="pointer"
                _focus={{
                    outline: 'none'
                }}
                _hover={{
                    bg: 'teal',
                    color: 'white'
                }}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white'
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};
