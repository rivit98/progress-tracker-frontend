import { ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/nav/navigation';
import Register from './components/auth/register';
import Login from './components/auth/login';
import { CrackmesFetcher } from './components/crackmes/crackmesFetcher';
import Home from './components/home/home';
import { withStore } from './context/store';
import { MapsFetcher } from './components/heroes-maps/mapsFetcher';
import { GamesFetcher } from './components/games/gamesFetcher';

const App = () => {
    return (
        <Container mt={6} p={0} maxW="container.xl" centerContent>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/crackmes" element={<CrackmesFetcher />} />
                <Route path="/heroes-maps" element={<MapsFetcher />} />
                <Route path="/games" element={<GamesFetcher />} />
            </Routes>
        </Container>
    );
};

const withComponent = (Wrapper, Wrapped) => (props) => {
    return (
        <Wrapper>
            <Wrapped {...props} />
        </Wrapper>
    );
};

const WrappedApp = [BrowserRouter, ChakraProvider, Navigation]
    .reverse()
    .reduce((acc, cur) => withComponent(cur, acc), App);

export default withStore(WrappedApp);
