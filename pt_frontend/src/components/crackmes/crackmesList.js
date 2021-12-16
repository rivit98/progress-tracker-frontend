import { crackmesService } from '../../services/crackmes';
import { useAxiosEffect } from '../../utils/useAxiosEffect';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
import { useDispatch, useSelector } from 'react-redux';
import { crackmes, resetFilters, setCrackmes, setTasksLastUpdated } from '../../context/crackmesReducer';
import { isLoggedIn } from '../../context/userReducer';
import { WEEK } from 'time-constants';
import { ListRenderer } from './listRenderer';
import { Filters } from './filters';

export const CrackmesList = () => {
    const logged = useSelector(isLoggedIn);
    const dispatch = useDispatch();

    const {
        lastUpdated: { date },
        cachedTasks
    } = useSelector(crackmes);

    const actionsLoader = (options) => {
        if (!logged) {
            return new Promise((resolve) => resolve([]));
        }

        return crackmesService.getActions(options);
    };

    const cacheResolver = (options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const lastUpdated = await crackmesService.lastUpdated(options);
                if (
                    date !== undefined &&
                    new Date(date).getTime() >= lastUpdated.date.getTime() && // if cache is newer (?) or same as remote, load
                    Date.now() - lastUpdated.date.getTime() < WEEK * 4 // if cache is not older than X, load
                ) {
                    dispatch(setTasksLastUpdated(lastUpdated));
                    resolve(cachedTasks.map((t) => ({ ...t, date: new Date(t.date) })));
                } else {
                    const updatedTasks = await crackmesService.getCrackmes(options);
                    dispatch(
                        setCrackmes({
                            lastUpdated: lastUpdated,
                            cachedTasks: updatedTasks
                        })
                    );
                    resolve(updatedTasks);
                }
                dispatch(resetFilters());
            } catch (e) {
                reject(e);
            }
        });
    };

    const taskListLoader = getAggregatedState(cacheResolver, actionsLoader);

    const state = useAxiosEffect(taskListLoader, [], [[], {}]);
    const stateData = state.data;
    const actions = stateData[1];

    const tasksWithActions = stateData[0].map((t) => {
        let a = actions[t.id] || [];
        a = a.sort((a1, a2) => a2.date.getTime() - a1.date.getTime());
        const lastAction = a[0] || undefined;
        return { ...t, actions: a, lastAction: lastAction };
    });

    return (
        <ComponentStateHandler state={state}>
            <Filters />
            <ListRenderer tasksWithActions={tasksWithActions} />
        </ComponentStateHandler>
    );
};
