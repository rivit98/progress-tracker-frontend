import { useSelector } from 'react-redux';
import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { ComponentStateHandler } from '../generic/componentStateHandler';
import { isLoggedIn } from '../../context/userReducer';
import { GamesList } from './gamesList';
import { gamesService } from '../../services/games';

export const GamesFetcher = () => {
    const logged = useSelector(isLoggedIn);

    const gamesLoader = (options) => {
        if (!logged) {
            return Promise.resolve([]);
        }

        return gamesService.getGamesWithActions(options);
    };

    const state = useAxiosEffect(gamesLoader, [], []);
    const games = state.data;

    const itemsWithActions = games.map((item) => {
        const { id, name, game_actions: gameActions } = item;
        const sortedActions = gameActions
            .map((action) => ({ ...action, date: new Date(action.date) }))
            .sort((a1, a2) => a2.date.getTime() - a1.date.getTime());
        const lastAction = sortedActions[0] || undefined;
        return {
            id,
            name,
            actions: sortedActions,
            lastAction,
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <GamesList itemsWithActions={itemsWithActions} />
        </ComponentStateHandler>
    );
};
