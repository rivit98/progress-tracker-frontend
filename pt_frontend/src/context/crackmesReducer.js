import { createSlice } from '@reduxjs/toolkit';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        lastUpdated: {},
        tasks: []
    },
    reducers: {
        storeTasks: (state, action) => {
            state.tasks = action.payload;
            return state;
        },
        setTasksLastUpdated: (state, action) => {
            state.lastUpdated = action.payload;
            return state;
        },
        setCrackmes: (state, action) => {
            return action.payload;
        },
        clearState: (state, action) => {
            return {
                lastUpdated: {},
                tasks: []
            };
        }
    }
});

export const { storeTasks, setTasksLastUpdated, clearState, setCrackmes } = crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer;

export default crackmesSlice.reducer;
