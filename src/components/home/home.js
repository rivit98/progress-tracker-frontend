import { Box, Button, Container, Link, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, UnorderedList, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Home = () => {
    return (
        <Container maxW="container.sm">
            <VStack experimental_spaceY={10} alignItems={'start'}>
                <Box textAlign={'justify'}>
                Use the panel below on the left side to log in or navigate to the trackers.
                </Box>
                <Box>
                    Currently supported trackers are:
                    <UnorderedList>
                        <ListItem>
                            <Popover trigger={'hover'} openDelay={100} closeOnBlur>
                                <PopoverTrigger>
                                    <Link as={ReactRouterLink} to={'/crackmes'} color={'teal.500'}>
                                        crackmes.one
                                    </Link>
                                </PopoverTrigger>
                                <PopoverContent bg='gray.700' borderColor='gray.700'>
                                    <PopoverBody>
                                        Track progress on{' '}
                                        <Link href={'https://crackmes.one'} isExternal color={'teal.500'}>
                                            crackmes.one
                                        </Link>{' '}
                                        website. Original page does not allow you to mark challenges as solved or hide the bad ones
                                        so I made custom tracker for it :)
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </VStack>
        </Container>
    );
};

export default Home;
