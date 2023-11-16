import { createSlice } from '@reduxjs/toolkit';


interface State {
    status: 'not-authenticated' | 'checking' | 'authenticated';
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    errorMessage?: string;
}

interface Action {
    type: string;
    payload: any;
}

const initialState: State = {
    status: 'checking',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: State, { payload }: Action) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            delete state.errorMessage;
        },
        logout: (state: State, { payload }: Action) => {
            state.status = 'not-authenticated';
            state.errorMessage = payload.errorMessage ?? payload.errorMessage;
            delete state.uid;
            delete state.email;
            delete state.displayName;
            delete state.photoURL;

            if (!state.errorMessage) delete state.errorMessage;
        },
        checkingCredentials: (state: State) => {
            state.status = 'checking';

        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;