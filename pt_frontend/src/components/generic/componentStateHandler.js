import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';

export const ComponentStateHandler = ({ children, state: { error, isLoading, data } }) => {
    if (isLoading) {
        return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.400" size="xl" />;
    }

    if (error || data === undefined) {
        return (
            <Alert status="error" color={'gray.700'}>
                <AlertIcon />
                {error?.message}
            </Alert>
        );
    }

    return <>{children}</>;
};
