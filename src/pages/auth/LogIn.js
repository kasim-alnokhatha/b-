import { useEffect, useState } from 'react';
import { TextField, Button, Box, Alert, Typography, CircularProgress } from '@mui/material';

import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserToken } from '../../redux/authSlice';
import { setUserInfo } from '../../redux/userSlice';
import { getToken, storeToken, storeEmailVerify, getEmailVerify } from '../../api/LocalStorageService';
import { useLoginUserMutation } from '../../api/userAuthApi';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function LogIn() {
  
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      // console.log(typeof (res.data))
      storeToken(res.data.token)
      
      // console.log(typeof(res.data.email_verification))
      storeEmailVerify(res.data.email_verified.toString())

      let { access_token } = getToken()
      let { email_verified } = getEmailVerify()
      console.log(email_verified)
      dispatch(setUserToken({ access_token: access_token }))
      dispatch(setUserInfo({ email_verified: email_verified }))
      navigate('/dashboard')
    }
  }
  let { access_token } = getToken()
  let { email_verified } = getEmailVerify()

  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
    dispatch(setUserInfo({ email_verified: email_verified }))

  }, [access_token, dispatch])



  return (
    <ThemeProvider theme={theme}>
      {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
      {server_error.email ? console.log(server_error.email[0]) : ""}
      {server_error.password ? console.log(server_error.password[0]) : ""}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" id='login-form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
           {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}

           

            <Grid container>
            {isLoading ? <CircularProgress sx={{ mt: 3, mb: 2 }} /> : <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Login</Button>}
            </Grid>
            
            <Grid container>

              <Grid item xs>
                <NavLink to='/sendpasswordresetemail' variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              {server_error.non_field_errors ? <Alert fullWidth severity='error' sx={{ mt: 3, mb: 2 }}>{server_error.non_field_errors[0]}</Alert> : ''}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}