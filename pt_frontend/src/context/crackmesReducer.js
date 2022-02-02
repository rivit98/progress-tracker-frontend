import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SORT_OPTION, defaultFilterStatuses } from '../components/crackmes/filtersConsts';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        lastUpdated: {},
        cachedTasks: [],
        filters: {
            filterStatuses: defaultFilterStatuses.map((v) => v['value']),
            searchTerm: '',
            sortMethod: DEFAULT_SORT_OPTION['value']
        },
        pagination: {
            currentPage: 1
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
        },
        resetFilters: (state, action) => {
            return { ...state, filters: crackmesSlice.getInitialState().filters };
        },
        setCurrentPage: (state, action) => {
            return { ...state, pagination: { ...state.pagination, currentPage: action.payload } };
        }
    }
});

export const { setTasksLastUpdated, clearState, setCrackmes, updateFilters, resetFilters, setCurrentPage } =
    crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer;
export const crackmesFilters = (state) => state.crackmesReducer.filters;
export const crackmesPagination = (state) => state.crackmesReducer.pagination;

export default crackmesSlice.reducer;
