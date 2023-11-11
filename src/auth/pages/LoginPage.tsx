import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layouts/AuthLayout';

export const LoginPage = (): JSX.Element => {
    return (
        <AuthLayout title='Inicio de Sesión'>

            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='correo' type='email' placeholder='Correo@google.com' fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='contraseña' type='password' placeholder='Contraseña' fullWidth></TextField>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth>Iniciar sesión</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth><Google /> <Typography sx={{ ml: 1 }}>Google</Typography></Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link color='inherit' to='/auth/register' component={RouterLink}>
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>
    );
};
