import { Box, Container, Link, ListItem, Popover, PopoverBody, PopoverContent, PopoverTrigger, UnorderedList, VStack } from '@chakra-ui/react';
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
                                        crackmes
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
                        <ListItem>
                            <Popover trigger={'hover'} openDelay={100} closeOnBlur>
                                <PopoverTrigger>
                                    <Link as={ReactRouterLink} to={'/heroes-maps'} color={'teal.500'}>
                                        heroes maps
                                    </Link>
                                </PopoverTrigger>
                                <PopoverContent bg='gray.700' borderColor='gray.700'>
                                    <PopoverBody>
                                        There are so many HoMM maps I want to play so I made a tracker for them so I don't miss any!
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
