import { createSlice } from '@reduxjs/toolkit';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        lastUpdated: {},
        cachedTasks: [],
        filters: {
            statuses: []
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

export const { setTasksLastUpdated, clearState, setCrackmes } = crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer;

export default crackmesSlice.reducer;
