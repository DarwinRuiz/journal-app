
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Note } from '../../store/journal/interfaces/note.interface';
import { SideBarItem } from './SideBarItem';

interface Props {
    drawerWidth: number;
}

export const SideBar = ({ drawerWidth }: Props): JSX.Element => {

    const { displayName } = useSelector((state: any) => state.auth);
    const { notes } = useSelector((state: any) => state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open={true}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' component='div'>{displayName}</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map((note: Note) => (
                            <SideBarItem key={note.id} note={note} />
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};
