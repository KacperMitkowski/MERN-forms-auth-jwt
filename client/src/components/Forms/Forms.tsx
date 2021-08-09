import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow, Paper, Button, Container } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router';
import { getForms } from '../../actions/forms';
import FormModel from '../../models/form';
import Form from './Form';

const Forms = () => {
    const { forms, isLoading } = useSelector((state: any) => state.forms);
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));

    console.log(forms);

    useEffect(() => {
        dispatch(getForms());
    }, [dispatch]);

    return (
        <Container style={{marginTop: "100px"}}>
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
        </Container>
    )
}

export default Forms;