import './App.css';
import { ChakraProvider, Container } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/home/home';
import { Navigation } from './components/nav/navigation';
import withComponent from './utils/withComponent';
import Register from './components/auth/register';
import Login from './components/auth/login';
import withStore from './context/withStore';
import { CrackmesList } from './components/crackmes/crackmesList';

const App = () => {
    return (
        <Container mt={20}>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/register'} component={Register} />

            <Route exact path={'/crackmes'} component={CrackmesList} />
        </Container>
    );
};

const WrappedApp = [ChakraProvider, Switch, Navigation].reverse().reduce((acc, cur) => withComponent(cur, acc), App);

export default withStore(withRouter(WrappedApp));
