import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        updateUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        removeUser: () => {
            return {};
        },
    },
});

export const { updateUser, removeUser } = userSlice.actions;

export const isLoggedIn = (state) => state.userReducer.id !== undefined;
export const currentUserData = (state) => state.userReducer;
export const userGroups = (state) => state.userReducer.groups;

export default userSlice.reducer;

export const hasPermissions = (groups, requiredPermissions) => {
    const groupNames = groups.map((g) => g.name);
    return requiredPermissions.every((perm) => groupNames.includes(perm));
};
