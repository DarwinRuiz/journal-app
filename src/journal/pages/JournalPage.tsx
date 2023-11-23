import { JournalLayout } from '../layouts/JournalLayout';
import { IconButton } from '@mui/material';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = (): JSX.Element => {

    const { isSaving, active } = useSelector((state: any) => state.journal);
    const dispatch = useDispatch();

    const onClickNewNote = (): void => {
        dispatch(startNewNote());
    };

    return (
        <JournalLayout>

            {
                (active) ? <NoteView /> : <NothingSelectedView />
            }


            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    );
};
