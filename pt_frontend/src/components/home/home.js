import { Box, Container, Link, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Home = () => {
    return (
        <Container maxW="container.sm">
            <VStack experimental_spaceY={10} alignItems={'start'}>
                <Box textAlign={'justify'}>
                    This is a simple application for tracking progress on{' '}
                    <Link href={'https://crackmes.one'} isExternal color={'teal.500'}>
                        crackmes.one
                    </Link>{' '}
                    website because original page does not allow you to mark challenges as solved or hide the bad ones
                    so I made custom tracker for it :) Use the panel on the right side to log in or navigate to the
                    crackmes list.
                </Box>
                <Box>
                    Currently supported trackers are:
                    <UnorderedList>
                        <ListItem>
                            <Link as={ReactRouterLink} to={'/crackmes'} color={'teal.500'}>
                                crackmes.one
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </VStack>
        </Container>
    );
};

export default Home;
