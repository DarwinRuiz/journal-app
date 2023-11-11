import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layouts/AuthLayout';

export const RegisterPage = (): JSX.Element => {
    return (
        <AuthLayout title='Crear cuenta'>

            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='Nombre Completo' type='text' placeholder='Jhon Doe' fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='correo' type='email' placeholder='Correo@google.com' fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='contraseña' type='password' placeholder='Contraseña' fullWidth></TextField>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button variant='contained' fullWidth>Crear cuenta</Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tiene una cuenta?</Typography>
                        <Link color='inherit' to='/auth/login' component={RouterLink}>
                            Iniciar Sesión
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>
    );
};
