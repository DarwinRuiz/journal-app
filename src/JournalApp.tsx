
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = (): JSX.Element => {
    return (
        <>
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </>
    );
};
