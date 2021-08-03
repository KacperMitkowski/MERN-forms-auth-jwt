import { Avatar, Button, Container, Grid, Paper, Snackbar, Typography } from '@material-ui/core';
import Alert from '../Helpers/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signup } from '../../actions/auth';
import { ERROR } from '../../constants/actionTypes';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles';
import * as EmailValidator from 'email-validator';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const RegisterUser = () => {
    const { error } = useSelector((state: any) => state.error);
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);


    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: ERROR, data: null });
        setShowError(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(form.password !== form.confirmPassword) {
            return dispatch({ type: ERROR, data: { error: "Passwords are not equal"} });
        }

        if(!EmailValidator.validate(form.email)) {
            return dispatch({ type: ERROR, data: { error: "Wrong email format"} });
        }

        dispatch(signup(form, history));
    };

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "80px"}}>
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={() => history.push('/loginUser')} color="primary">Already have an account? Sign in</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" className={classes.alert}>{error}</Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterUser;


