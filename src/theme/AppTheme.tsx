import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from '.';


interface Props {
    children: JSX.Element
}

export const AppTheme = ({ children }: Props): JSX.Element => {
    return (
        <ThemeProvider theme={purpleTheme} >
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
