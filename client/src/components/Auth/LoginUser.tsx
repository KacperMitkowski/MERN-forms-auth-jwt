import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signin } from '../../actions/auth';
import GoogleIcon from './GoogleIcon';
import useStyles from './styles';
import Input from './Input';
import { AUTH, ERROR } from '../../constants/actionTypes';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from 'react';
import Alert from '../Helpers/Alert';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const LoginUser = () => {
  const { error } = useSelector((state: any) => state.error);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      dispatch({ type: ERROR, data: null });
    }
  }, [error])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signin(form, history));
  };

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: "80px"}}>
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>Sign In</Button>
          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="secondary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={() => history.push('/register')} color="secondary">Don't have an account? Sign Up</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" className={classes.alert}>Invalid Credentials </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginUser;
