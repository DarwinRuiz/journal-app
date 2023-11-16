import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

interface Props {
    children: JSX.Element[]
}

const drawerWidth: number = 240;

export const JournalLayout = ({ children }: Props): JSX.Element => {
    return (
        <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />

            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

                <Toolbar />

                {children}

            </Box>
        </Box>
    );
};