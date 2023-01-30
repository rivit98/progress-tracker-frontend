import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';

export const NotLoggedInfo = () => {
    return (
        <Box w={'full'} maxW={'xl'} mx={'auto'} mb={5} mt={5} color={'black'}>
            <Alert status="info">
                <AlertIcon />
                <Link as={ReactRouterLink} to={'/login'}>
                    <Text color={'teal'} fontWeight={'bold'}>
                        Log in
                    </Text>
                </Link>
                <Text ml={1}>to track progress</Text>
            </Alert>
        </Box>
    );
};
