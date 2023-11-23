import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Note } from '../../store/journal/interfaces/note.interface';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

interface Props {
    note: Note
}

export const SideBarItem = ({ note }: Props): JSX.Element => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return note.title.length > 17 ? note.title.substring(0, 17) + '...' : note.title;
    }, [note.title]);


    const onClickItem = (): void => {
        dispatch(setActiveNote(note));
    };

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickItem}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={note.body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
