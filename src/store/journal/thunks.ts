import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { Note } from './interfaces/note.interface';
import { addNewEmptyNote, savingNewNote, setActiveNote, setImagesToActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { loadNotes } from '../../journal/helpers/loadNotes';
import { fileUpload } from '../../journal/helpers/fileUpload';



export const startNewNote = (): any => {
    return async (dispatch: any, getState: any): Promise<any> => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote: Note = {
            id: '',
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const newDocument = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDocument, newNote);

        newNote.id = newDocument.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};


export const startLoadingNotes = (): any => {
    return async (dispatch: any, getState: any): Promise<any> => {

        const { uid } = getState().auth;

        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};


export const startSaveNote = (): any => {
    return async (dispatch: any, getState: any): Promise<any> => {

        dispatch(setSaving());

        const { uid } = getState().auth;

        if (!uid) throw new Error('El UID del usuario no existe');

        const { active: activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        const documentRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(documentRef, noteToFireStore, { merge: true });

        dispatch(updateNote(activeNote));
    };
};


export const startUploadingFiles = (imageList: FileList): any => {
    return async (dispatch: any): Promise<any> => {

        dispatch(setSaving());

        const fileUploadPromises: Promise<string>[] = [];

        for (const image of imageList) {
            fileUploadPromises.push(fileUpload(image));
        }

        const images: string[] = await Promise.all(fileUploadPromises);

        dispatch(setImagesToActiveNote(images));
    };
};


export const startDeletingNote = (): any => {
    return async (dispatch: any, getState: any): Promise<any> => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const { active: activeNote } = getState().journal;

        console.log({ uid, activeNote });
    };
};