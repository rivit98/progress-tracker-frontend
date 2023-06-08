import { Card, CardHeader, Center, Container, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const HomeCard = ({ header, target }) => {
    return (
        <Card as={ReactRouterLink} to={target} bg="whiteAlpha.800" w="full">
            <CardHeader>
                <Center>
                    <Heading size="md">{header}</Heading>
                </Center>
            </CardHeader>
        </Card>
    );
};

const Home = () => {
    return (
        <Container maxW="container.sm">
            <VStack experimental_spaceY={10} alignItems="center">
                <SimpleGrid spacing={4} columns={2}>
                    <HomeCard header="crackmes" target="/crackmes" />
                    <HomeCard header="heroes maps" target="/heroes-maps" />
                    <HomeCard header="games" target="/games" />
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default Home;
