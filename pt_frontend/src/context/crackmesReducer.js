import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SORT_OPTION, defaultFilterStatuses } from '../components/crackmes/filtersConsts';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        crackmes: {
            lastUpdated: {},
            cachedTasks: []
        },
        filters: {
            filterStatuses: defaultFilterStatuses.map((v) => v['value']),
            searchTerm: '',
            sortMethod: DEFAULT_SORT_OPTION['value']
        }
    },
    reducers: {
        setTasksLastUpdated: (state, action) => {
            return { ...state, crackmes: { ...state.crackmes, lastUpdated: action.payload } };
        },
        setCrackmes: (state, action) => {
            return { ...state, crackmes: { ...action.payload } };
        },
        clearState: (state, action) => {
            return crackmesSlice.getInitialState();
        },
        updateFilters: (state, action) => {
            return { ...state, filters: { ...state.filters, ...action.payload } };
        },
        resetFilters: (state, action) => {
            return { ...state, filters: crackmesSlice.getInitialState().filters };
        }
    }
});

export const { setTasksLastUpdated, clearState, setCrackmes, updateFilters, resetFilters } = crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer.crackmes;
export const crackmesFilters = (state) => state.crackmesReducer.filters;

export default crackmesSlice.reducer;
