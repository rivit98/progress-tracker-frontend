import { useSelector } from 'react-redux';
import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
import { isLoggedIn } from '../../context/userReducer';
import { heroesMapsService } from '../../services/heroesMaps';
import { MapsList } from './mapsList';

export const MapsFetcher = () => {
    const logged = useSelector(isLoggedIn);

    const actionsLoader = (options) => {
        if (!logged) {
            return Promise.resolve([]);
        }

        return heroesMapsService.getActions(options);
    };

    const taskListLoader = getAggregatedState((options) => heroesMapsService.getMaps(options), actionsLoader);
    const state = useAxiosEffect(taskListLoader, [], [[], {}]);
    const [maps, actions] = state.data;

    const itemsWithActions = maps.map((m) => {
        let mapsActions = actions[m.id] || [];
        mapsActions = mapsActions
            .map((action) => ({ ...action, date: new Date(action.date) }))
            .sort((a1, a2) => a2.date.getTime() - a1.date.getTime());
        const lastAction = mapsActions[0] || undefined;
        return {
            ...m,
            actions: mapsActions,
            lastAction,
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <MapsList itemsWithActions={itemsWithActions} />
        </ComponentStateHandler>
    );
};
