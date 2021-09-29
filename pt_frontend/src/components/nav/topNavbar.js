import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import React from 'react';

export const TopNavbar = ({ onOpen }) => {
    return (
        <Flex px={4} height="12" alignItems="center" bg={'gray.700'} justifyContent={'space-between'}>
            <Box flex={1}>
                <IconButton
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu />}
                    _hover={{
                        background: 'blackAlpha.600',
                        color: 'teal.500'
                    }}
                />
            </Box>

            <Text
                display={'flex'}
                flex={3}
                fontSize="xl"
                fontFamily="monospace"
                fontWeight="bold"
                justifyContent={'center'}
            >
                ProgressTracker
            </Text>

            <Box display={'flex'} flex={1} justifyContent={'flex-end'} />
        </Flex>
    );
};
