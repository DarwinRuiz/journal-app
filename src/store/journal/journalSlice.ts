import { createSlice } from '@reduxjs/toolkit';
import { Note } from './interfaces/note.interface';


interface State {
    isSaving: boolean;
    messageSaved: string;
    notes: Note[];
    active?: Note
}

interface Action {
    type: string;
    payload: any;
}

const initialState: State = {
    isSaving: false,
    messageSaved: '',
    notes: []
};

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state: State) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state: State, action: Action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state: State, action: Action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state: State, action: Action) => {
            state.notes = action.payload;
        },
        setSaving: (state: State) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state: State, action: Action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note: Note) => {
                if (note.id === action.payload.id) return action.payload;

                return note;
            });

            state.messageSaved = `${action.payload.title}, actualizada correctamente!`;
        },
        setImagesToActiveNote: (state: State, action: Action) => {
            state.active!.imageUrls = state.active!.imageUrls ? state.active!.imageUrls : [];

            state.active!.imageUrls = [...state.active!.imageUrls!, ...action.payload];

            state.isSaving = false;
        },
        clearNotesSignOut: (state: State) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            delete state.active;
        },
        deleteNoteById: (state: State, action: Action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            delete state.active;
        },
    }
});


// Action creators are generated for each case reducer function
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, setImagesToActiveNote, clearNotesSignOut } = journalSlice.actions;