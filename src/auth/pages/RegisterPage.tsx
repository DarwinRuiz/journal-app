import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { UserCreate } from '../dtos/userCreate.dto';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';


const userData: UserCreate = {
    displayName: '',
    email: '',
    password: ''
};


const formValidation: { [key: string]: [(value: string) => boolean, string] } = {
    email: [(value: string): boolean => value.includes('@'), 'El correo debe ser un correo válido. Ej. email@email.com'],
    password: [(value: string): boolean => value.length >= 8, 'La longitud mínima de la contraseña debe de ser de 8 caracteres'],
    displayName: [(value: string): boolean => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = (): JSX.Element => {

    const [formSumitted, setFormSumitted] = useState<boolean>(false);
    const { displayName, email, password, formState, displayNameValid, emailValid, passwordValid, isFormValid, onInputChange } = useForm<UserCreate>(userData, formValidation);

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state: any) => state.auth);
    const isAuthenticating = useMemo(() => status === 'checking', [status]);



    const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setFormSumitted(true);

        if (!isFormValid) return;


        dispatch(startCreatingUserWithEmailPassword(formState));
    };

    return (
        <AuthLayout title='Crear cuenta'>

            <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre Completo'
                            type='text'
                            placeholder='Jhon Doe'
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            autoComplete='off'
                            fullWidth
                            error={!!displayNameValid && formSumitted}
                            helperText={displayNameValid}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='correo'
                            type='email'
                            placeholder='Correo@google.com'
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            autoComplete='off'
                            fullWidth
                            error={!!emailValid && formSumitted}
                            helperText={emailValid}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='contraseña'
                            type='password'
                            placeholder='Contraseña'
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            autoComplete='off'
                            fullWidth
                            error={!!passwordValid && formSumitted}
                            helperText={passwordValid}
                        ></TextField>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={errorMessage !== undefined && errorMessage !== null ? '' : 'none'}>
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12} >
                            <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>Crear cuenta</Button>
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
