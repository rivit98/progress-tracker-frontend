import { useSelector } from 'react-redux';
import { currentUserData, isLoggedIn } from '../../context/userReducer';
import { Text } from '@chakra-ui/react';
import React from 'react';

export const UserMenu = () => {
    const { username } = useSelector(currentUserData);
    const logged = useSelector(isLoggedIn);

    return (
        <>
            {logged && <Text fontWeight={'bold'}>{username}</Text>}
        </>
    );
};
