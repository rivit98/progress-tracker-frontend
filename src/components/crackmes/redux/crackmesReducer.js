import { createSlice } from '@reduxjs/toolkit';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        lastUpdated: {},
        cachedTasks: []
    },
    reducers: {
        setTasksLastUpdated: (state, action) => {
            return { ...state, lastUpdated: action.payload };
        },
        setCrackmes: (state, action) => {
            
            return { ...action.payload };
        },
        clearState: (state, action) => {
            return crackmesSlice.getInitialState();
        },
    }
});

export const { setTasksLastUpdated, clearState, setCrackmes } = crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer;

export default crackmesSlice.reducer;
