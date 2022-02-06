import { Container, Link } from '@chakra-ui/react';

const Home = () => {
    return (
        <Container textAlign={'justify'}>
            This is a simple application for tracking progress on{' '}
            <Link href={'https://crackmes.one'} isExternal color={'teal.500'}>
                crackmes.one
            </Link>{' '}
            website because original page does not allow you to mark challenges as solved or hide the bad ones so I made
            custom tracker for it :) Use the panel on the right side to log in or navigate to the crackmes list.
        </Container>
    );
};

export default Home;
