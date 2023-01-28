import { crackmesService } from '../../services/crackmes';
import { useAxiosEffect } from '../../hooks/useAxiosEffect';
import { ComponentStateHandler, getAggregatedState } from '../generic/componentStateHandler';
import { useDispatch, useSelector } from 'react-redux';
import { crackmes, setCrackmes, setTasksLastUpdated } from './redux/crackmesReducer';
import { isLoggedIn } from '../../context/userReducer';
import { WEEK } from 'time-constants';
import { CrackmesList } from './crackmesList';
import { UpdateSummary } from './summary';

export const CrackmesFetcher = () => {
    const logged = useSelector(isLoggedIn);
    const dispatch = useDispatch();

    const {
        lastUpdated: { date },
        cachedTasks
    } = useSelector(crackmes);

    const actionsLoader = async (options) => {
        if (!logged) {
            return Promise.resolve([])
        }

        return crackmesService.getActions(options);
    };

    const cacheResolver = async (options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const lastUpdated = await crackmesService.lastUpdated(options);
                const lastUpdatedDate = new Date(lastUpdated.date)
                if (
                    date !== undefined &&
                    new Date(date).getTime() >= lastUpdatedDate.getTime() && // if cache is newer or same as remote, load
                    Date.now() - lastUpdatedDate.getTime() < WEEK * 4 // if cache is not older than X, load
                ) {
                    dispatch(setTasksLastUpdated(lastUpdated));
                    resolve(cachedTasks);
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
            } catch (e) {
                reject(e);
            }
        });
    };

    const tasksLoader = async (options) => {
        const [lastUpdated, crackmes] = await Promise.all([crackmesService.lastUpdated(options), crackmesService.getCrackmes(options)]);
        dispatch(setTasksLastUpdated(lastUpdated));
        return crackmes;
    }

    const taskListLoader = getAggregatedState(tasksLoader, actionsLoader);
    const state = useAxiosEffect(taskListLoader, [], [[], {}]);
    const [crackmesList, actions] = state.data;

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
            lastAction: lastAction
        };
    });

    return (
        <ComponentStateHandler state={state}>
            <CrackmesList tasksWithActions={tasksWithActions} />
            <UpdateSummary />
        </ComponentStateHandler>
    );
};
