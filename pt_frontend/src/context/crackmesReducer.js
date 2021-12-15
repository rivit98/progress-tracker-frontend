import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SORT_OPTION } from '../components/crackmes/filtersConsts';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        lastUpdated: {},
        cachedTasks: [],
        filters: {
            filterStatuses: [],
            searchTerm: '',
            sortMethod: DEFAULT_SORT_OPTION['value']
        }
    },
    reducers: {
        setTasksLastUpdated: (state, action) => {
            return { ...state, lastUpdated: action.payload };
        },
        setCrackmes: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearState: (state, action) => {
            return crackmesSlice.getInitialState();
        },
        updateFilters: (state, action) => {
            return { ...state, filters: { ...state.filters, ...action.payload } };
        }
    }
});

export const { setTasksLastUpdated, clearState, setCrackmes, updateFilters } = crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer;
export const crackmesFilters = (state) => state.crackmesReducer.filters;

export default crackmesSlice.reducer;
