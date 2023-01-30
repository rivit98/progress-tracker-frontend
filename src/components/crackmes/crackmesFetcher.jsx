import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { crackmesService } from '../../services/crackmes';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
import { CrackmesList } from './crackmesList';
import { UpdateSummary } from './summary';

export const CrackmesFetcher = () => {
    const logged = useSelector(isLoggedIn);

    const actionsLoader = async (options) => {
        if (!logged) {
            return Promise.resolve([]);
        }

        return crackmesService.getActions(options);
    };

    const taskListLoader = getAggregatedState(
        (options) => crackmesService.getCrackmes(options),
        actionsLoader,
        (options) => crackmesService.lastUpdated(options)
    );
    const state = useAxiosEffect(taskListLoader, [], [[], {}]);
    const [crackmesList, actions, lastUpdated] = state.data;

    const tasksWithActions = crackmesList.map((t) => {
        let taskActions = actions[t.id] || [];
        taskActions = taskActions
            .map((action) => ({ ...action, date: new Date(action.date) }))
            .sort((a1, a2) => a2.date.getTime() - a1.date.getTime());

        const lastAction = taskActions[0] || undefined;
        return {
            ...t,
            date: new Date(t.date),
            actions: taskActions,
            lastAction,
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <CrackmesList itemsWithActions={tasksWithActions} />
            <UpdateSummary lastUpdated={lastUpdated} />
        </ComponentStateHandler>
    );
};
