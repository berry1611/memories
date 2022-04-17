import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { AUTH } from '../../constants/actionTypes';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };
  const googleSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log('Google sign in was unsuccessful. Try again later.');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" variant="contained" fullWidth color="primary" className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="216871199201-dkrrmua6ld0vprp32skebkpndeadcpvj.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
