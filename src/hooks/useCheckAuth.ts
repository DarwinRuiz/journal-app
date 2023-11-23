import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckAuth = (): { [key: string]: string } => {
    const { status } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user: any) => {
            if (!user) return dispatch(logout({ errorMessage: null }));

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNotes());
        });

    }, []);


    return {
        status
    };
};
