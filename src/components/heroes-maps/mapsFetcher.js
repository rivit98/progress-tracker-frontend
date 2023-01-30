import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import { heroesMapsService } from '../../services/heroesMaps';
import { MapsList } from './mapsList';

export const MapsFetcher = () => {
    const logged = useSelector(isLoggedIn);

    const actionsLoader = (options) => {
        if (!logged) {
            return new Promise((resolve) => resolve([]));
        }

        return heroesMapsService.getActions(options);
    };

    const mapsLoader = (options) => {
        return heroesMapsService.getMaps(options);
    };

    const taskListLoader = getAggregatedState(mapsLoader, actionsLoader);
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
            lastAction: lastAction,
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <MapsList itemsWithActions={itemsWithActions} />
        </ComponentStateHandler>
    );
};
