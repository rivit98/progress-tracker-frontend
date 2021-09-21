import { useSelector } from 'react-redux';
import { currentUserData, isLoggedIn } from '../../context/userReducer';
import { Text } from '@chakra-ui/react';
import React from 'react';

export const UserMenu = () => {
    const { username } = useSelector(currentUserData);
    const logged = useSelector(isLoggedIn);

    const loggedAs = () => {
        return (
            <>
                <Text mr={1}>Logged as: </Text>
                <Text fontWeight={'bold'}>{username}</Text>
            </>
        );
    };

    return (
        <>
            {logged && loggedAs()}
            {!logged && <Text>Not logged</Text>}
        </>
    );
};
