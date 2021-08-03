import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow, Paper, Button } from '@material-ui/core';
import Movie from './Form/Form';
import useStyles from './styles';
import { Alert } from '@material-ui/lab';


const Forms = () => {
    const { isLoading } = useSelector((state: any) => state.forms);
    const classes = useStyles();

    if (!isLoading) return (
        <Grid container spacing={3}>
            <Alert severity="error" style={{ width: "100%" }}>No forms found</Alert>
        </Grid>)

    return (
        isLoading ?
            <Grid container spacing={3}>
                <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress size="7em" color="secondary" value={100} />
                </Paper>
            </Grid>
            :
            <Grow in={true} timeout={{ enter: 1500 }}>
                <div>TEST</div>
            </Grow>
    )
}

export default Forms;