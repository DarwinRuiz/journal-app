import { UserCreate } from '../../auth/dtos/userCreate.dto';
import { UserLogin } from '../../auth/dtos/userLogin.dto';
import { UserDataGoogle } from '../../firebase/dtos/userDataGoogle.dto';
import { registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle, signOutFirebase } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';


export const checkingAuthentication = (): any => {
    return async (dispatch: any): Promise<any> => {
        dispatch(checkingCredentials());
    };
};


export const startGoogleSignIn = (): any => {
    return async (dispatch: any): Promise<any> => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, email, displayName, errorMessage }: UserDataGoogle = await signInWithGoogle();

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, displayName, photoURL, }));
    };
};


export const startCreatingUserWithEmailPassword = (newUserData: UserCreate): any => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, email, displayName, errorMessage }: UserDataGoogle = await registerUserWithEmailPassword(newUserData);

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, displayName, photoURL, }));
    };
};


export const startSignInWithEmailPassword = (user: UserLogin): any => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, email, displayName, errorMessage }: UserDataGoogle = await signInWithEmailPassword(user);

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, email, displayName, photoURL, }));
    };
};


export const startSignOut = (): any => {
    return async (dispatch: any) => {
        await signOutFirebase();
        dispatch(logout({ errorMessage: null }));
    };
};