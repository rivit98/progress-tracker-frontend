import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { UserMenu } from './userMenu';
import React from 'react';

export const TopNavbar = ({ onOpen }) => {
    return (
        <Flex
            px={4}
            height="12"
            alignItems="center"
            bg={'white'}
            borderBottomWidth="1px"
            borderBottomColor={'gray.200'}
            justifyContent={'space-between'}
        >
            <Box flex={1}>
                <IconButton onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />
            </Box>

            <Text
                display={'flex'}
                flex={3}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                justifyContent={'center'}
            >
                Progress tracker
            </Text>
            
            <Box display={'flex'} flex={1} justifyContent={'flex-end'}>
                <UserMenu />
            </Box>
        </Flex>
    );
};
