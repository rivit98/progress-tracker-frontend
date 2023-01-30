import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

export const TopNavbar = ({ onOpen }) => {
    return (
        <Flex px={4} height="12" alignItems="center" bg="gray.700" justifyContent="space-between">
            <Box flex={1}>
                <IconButton
                    onClick={onOpen}
                    variant="ghost"
                    aria-label="open menu"
                    icon={<HamburgerIcon />}
                    _hover={{
                        background: 'blackAlpha.600',
                        color: 'teal.500',
                    }}
                />
            </Box>

            <Text
                display="flex"
                flex={3}
                fontSize="xl"
                fontFamily="monospace"
                fontWeight="bold"
                justifyContent="center"
            >
                <Link as={ReactRouterLink} to="/" style={{ textDecoration: 'none' }}>
                    ProgressTracker
                </Link>
            </Text>

            <Box display="flex" flex={1} justifyContent="flex-end" />
        </Flex>
    );
};
