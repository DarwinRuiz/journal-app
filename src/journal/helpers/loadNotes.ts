import { collection, getDocs } from 'firebase/firestore/lite';
import { Note } from '../../store/journal/interfaces/note.interface';
import { FirebaseDB } from '../../firebase/config';


export const loadNotes = async (uid: string): Promise<Note[]> => {

    const notes: Note[] = [];

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    docs.forEach(doc => {
        notes.push({ id: doc.id, body: doc.data().body, title: doc.data().title, date: doc.data().date, imageUrls: doc.data().imageUrls || [] });
    });

    return notes;
};