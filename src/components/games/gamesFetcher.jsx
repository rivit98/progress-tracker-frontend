import { useSelector } from 'react-redux';
import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
import { isLoggedIn } from '../../context/userReducer';
import { GamesList } from './gamesList';
import { gamesService } from '../../services/games';

export const GamesFetcher = () => {
    const logged = useSelector(isLoggedIn);

    const actionsLoader = (options) => {
        if (!logged) {
            return Promise.resolve([]);
        }

        return gamesService.getActions(options);
    };

    const taskListLoader = getAggregatedState((options) => gamesService.getGames(options), actionsLoader);
    const state = useAxiosEffect(taskListLoader, [], [[], {}]);
    const [games, actions] = state.data;

    const itemsWithActions = games.map((m) => {
        let gamesActions = actions[m.id] || [];
        gamesActions = gamesActions
            .map((action) => ({ ...action, date: new Date(action.date) }))
            .sort((a1, a2) => a2.date.getTime() - a1.date.getTime());
        const lastAction = gamesActions[0] || undefined;
        return {
            ...m,
            actions: gamesActions,
            lastAction,
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <GamesList itemsWithActions={itemsWithActions} />
        </ComponentStateHandler>
    );
};
