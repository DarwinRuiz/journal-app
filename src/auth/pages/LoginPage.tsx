import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { UserLogin } from '../dtos/userLogin.dto';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startSignInWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

export const LoginPage = (): JSX.Element => {

    const { status, errorMessage } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm<UserLogin>({
        email: '',
        password: ''
    });

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const isValidFields = useMemo(() => (email.length > 0 && password.length > 0), [email, password]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(startSignInWithEmailPassword({ email, password }));
    };

    const onGoogleSignIn = (): void => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title='Inicio de Sesión'>

            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster' >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='correo' type='email' placeholder='Correo@google.com' name='email' value={email} onChange={onInputChange} autoComplete='off' fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField label='contraseña' type='password' placeholder='Contraseña' name='password' value={password} onChange={onInputChange} autoComplete='off' fullWidth></TextField>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={errorMessage !== undefined && errorMessage !== null ? '' : 'none'}>
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating || !isValidFields} variant='contained' type='submit' fullWidth>Iniciar sesión</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating} variant='contained' onClick={onGoogleSignIn} fullWidth><Google /> <Typography sx={{ ml: 1 }}>Google</Typography></Button>
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
