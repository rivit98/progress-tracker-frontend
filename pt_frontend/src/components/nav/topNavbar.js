import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

export const TopNavbar = ({ onOpen }) => {
    return (
        <Flex px={4} height="12" alignItems="center" bg={'gray.700'} justifyContent={'space-between'}>
            <Box flex={1}>
                <IconButton
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<HamburgerIcon />}
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
