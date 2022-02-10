import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAxiosEffect = (getData, deps, defaultState = undefined) => {
    const [data, setData] = useState(defaultState);
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();

        getData({
            cancelToken: source.token
        })
            .then((res) => {
                if (!unmounted) {
                    setLoading(false);
                    setData(res);
                }
            })
            .catch((e) => {
                if (!unmounted) {
                    setLoading(false);
                    setError(e);
                }
            });

        return () => {
            unmounted = true;
            source.cancel();
        };
    }, deps);

    return { data, isLoading, error };
};
