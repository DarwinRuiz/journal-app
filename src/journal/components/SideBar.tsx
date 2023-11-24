
import { Box, Divider, Drawer, Grid, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Note } from '../../store/journal/interfaces/note.interface';
import { SideBarItem } from './SideBarItem';

interface Props {
    drawerWidth: number;
}

export const SideBar = ({ drawerWidth }: Props): JSX.Element => {

    const { displayName, photoURL } = useSelector((state: any) => state.auth);
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

                    <Grid
                        container
                        columns={2}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item justifyContent='end'>
                            <img
                                srcSet={`${photoURL ? photoURL : '../src/assets/usuario.png'}`}
                                src={`${photoURL ? photoURL : '../src/assets/usuario.png'}`}
                                width='45px'
                                height='45px'
                                alt='Foto de Perfil'
                                style={{ borderRadius: '50%' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='h6' component='div'>{displayName}</Typography>
                        </Grid>

                    </Grid>

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
