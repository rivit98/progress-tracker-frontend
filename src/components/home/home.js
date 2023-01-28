import { Box, Card, CardBody, CardHeader, Center, Container, Divider, Heading, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const HomeCard = ({ header, target, children }) => {
    return <Card as={ReactRouterLink} to={target} bg={'whiteAlpha.800'}>
        <CardHeader>
            <Center>
                <Heading size='md'>{header}</Heading>
            </Center>
        </CardHeader>
        <Divider></Divider>
        <CardBody>
            {children}
        </CardBody>
    </Card>
}

const Home = () => {
    return (
        <Container maxW="container.sm">
            <VStack experimental_spaceY={10} alignItems={'start'}>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <HomeCard header={'crackmes'} target={'/crackmes'}>
                        <Text>
                            Tracker for{' '}
                            <Link href={'https://crackmes.one'} isExternal color={'teal.500'}>
                                crackmes.one
                            </Link>.{' '}
                            Original site does not allow you to mark challenges as solved or hide the bad ones
                            so I made a custom tracker for it :)
                        </Text>
                    </HomeCard>

                    <HomeCard header={'heroes maps'} target={'/heroes-maps'}>
                        <Text>
                            There are so many HoMM maps I want to play so fancy tracker for them would be useful!
                        </Text>
                    </HomeCard>
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default Home;
