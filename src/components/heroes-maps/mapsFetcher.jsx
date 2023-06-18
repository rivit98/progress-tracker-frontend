import { useSelector } from 'react-redux';
import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { ComponentStateHandler } from '../generic/componentStateHandler';
import { isLoggedIn } from '../../context/userReducer';
import { heroesMapsService } from '../../services/heroesMaps';
import { MapsList } from './mapsList';

export const MapsFetcher = () => {
    const logged = useSelector(isLoggedIn);

    const mapsLoader = (options) => {
        if (!logged) {
            return Promise.resolve([]);
        }

        return heroesMapsService.getMapsWithActions(options);
    };

    const state = useAxiosEffect(mapsLoader, [], []);
    const maps = state.data;

    const itemsWithActions = maps.map((item) => {
        const { id, name, heroes_version, map_actions: mapActions } = item;

        const sortedActions = mapActions
            .map((action) => ({ ...action, date: new Date(action.date) }))
            .sort((a1, a2) => a2.date.getTime() - a1.date.getTime());
        const lastAction = sortedActions[0] || undefined;
        return {
            id,
            name,
            heroes_version,
            actions: sortedActions,
            lastAction,
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <MapsList itemsWithActions={itemsWithActions} />
        </ComponentStateHandler>
    );
};
