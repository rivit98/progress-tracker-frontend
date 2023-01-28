import { Alert, AlertIcon, Box, Text } from '@chakra-ui/react';

export const EmptyResultSet = () => {
    return (
        <Box w={'full'} maxW={'xl'} mx={'auto'} mb={5} mt={5} color={'black'}>
            <Alert status='warning' >
                <AlertIcon />
                <Text>
				No tasks matching your search criteria
                </Text>
            </Alert>
        </Box>
    );
};
