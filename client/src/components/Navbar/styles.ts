import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        logout: {
            marginLeft: '20px',
        },
        userName: {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
            marginRight: '20px'
        },
    }),
);