import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';
import { UserDataGoogle } from './dtos/userDataGoogle.dto';
import { UserCreate } from '../auth/dtos/userCreate.dto';
import { UserLogin } from '../auth/dtos/userLogin.dto';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserDataGoogle> => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        };
    } catch (error: any) {
        console.error(error);
        return {
            ok: false,
            errorMessage: error.message
        };
    }
};


export const registerUserWithEmailPassword = async ({ displayName, email, password }: UserCreate): Promise<UserDataGoogle> => {
    try {
        const userCreatedResponse = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = userCreatedResponse.user;

        await updateProfile(FirebaseAuth.currentUser!, { displayName });

        return {
            ok: true,
            displayName, email, photoURL, uid
        };
    } catch (error: any) {
        console.error(error);
        return {
            ok: false,
            errorMessage: error.message
        };
    }
};


export const signInWithEmailPassword = async ({ email, password }: UserLogin): Promise<UserDataGoogle> => {
    try {
        const userSignInResponse = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { displayName, photoURL, uid } = userSignInResponse.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        };
    } catch (error: any) {
        console.error(error);
        return {
            ok: false,
            errorMessage: error.message
        };
    }
};



export const signOutFirebase = async (): Promise<void> => {
    return await FirebaseAuth.signOut();
};