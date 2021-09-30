import { createSlice } from '@reduxjs/toolkit';

export const crackmesSlice = createSlice({
    name: 'crackmes',
    initialState: {
        lastUpdated: {},
        cachedTasks: []
    },
    reducers: {
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
                cachedTasks: []
            };
        }
    }
});

export const { setTasksLastUpdated, clearState, setCrackmes } = crackmesSlice.actions;
export const crackmes = (state) => state.crackmesReducer;

export default crackmesSlice.reducer;
