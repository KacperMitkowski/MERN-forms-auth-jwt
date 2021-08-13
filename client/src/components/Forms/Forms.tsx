import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow, Paper, Button, Container, Snackbar } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router';
import { getForms } from '../../actions/forms';
import FormModel from '../../models/form';
import Form from './Form';
import { DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../../constants/actionTypes';
import Alert from '../Helpers/Alert';

const Forms = () => {
    const { forms, isLoading, updateSuccessful, deleteSuccessful } = useSelector((state: any) => state.forms);
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const profile = localStorage.getItem('profile')!;

    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [user, setUser] = useState(JSON.parse(profile));

    useEffect(() => {
        if (updateSuccessful) {
            setShowEditSuccess(true);
        }
    }, [updateSuccessful]);

    useEffect(() => {
        if (deleteSuccessful) {
            setShowDeleteSuccess(deleteSuccessful);
        }
    }, [deleteSuccessful]);

    useEffect(() => {
        dispatch(getForms());
    }, [dispatch]);

    const handleCloseEditSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: UPDATE_SUCCESSFUL, payload: false });
        setShowEditSuccess(false);
    }

    const handleCloseDeleteSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: DELETE_SUCCESSFUL, payload: false });
        setShowDeleteSuccess(false);
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            {user?.result &&
                <Button variant="contained" color="primary" fullWidth onClick={() => history.push("/addForm")}>Add form</Button>
            }
            {isLoading ?
                <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress size="7em" color="primary" value={100} />
                </Paper>
                :
                <Grow in={true} timeout={{ enter: 1500 }}>
                    <Grid container spacing={3}>
                        {
                            forms?.map((form: FormModel, index: number) => (
                                <Form form={form} key={index} />
                            ))
                        }
                    </Grid>
                </Grow>
            }
            <Snackbar open={showEditSuccess} autoHideDuration={6000} onClose={handleCloseEditSuccess}>
                <Alert onClose={handleCloseEditSuccess} severity="success">Edit successful</Alert>
            </Snackbar>
            <Snackbar open={showDeleteSuccess} autoHideDuration={6000} onClose={handleCloseDeleteSuccess}>
                <Alert onClose={handleCloseDeleteSuccess} severity="success">Delete successful</Alert>
            </Snackbar>
        </Container>
    )
}

export default Forms;