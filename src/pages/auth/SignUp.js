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
import { getToken, storeToken, storeEmailVerify} from '../../api/LocalStorageService';
import { useRegisterUserMutation } from '../../api/userAuthApi'



const theme = createTheme();

const Registration = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
    }
    const res = await registerUser(actualData)
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      storeToken(res.data.token)
      storeEmailVerify(res.data.email_verified.toString())

      navigate('/dashboard')
    }
  }
  return (
    <ThemeProvider theme={theme}>
      {/* {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
      {server_error.email ? console.log(server_error.email[0]) : ""}
      {server_error.password ? console.log(server_error.password[0]) : ""}
     */}
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
            Create Account
          </Typography>
          <Box component="form" id='registration-form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id='name' 
              name='name' 
              label='Name'
              autoComplete="email"
              autoFocus
            />
          {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.name[0]}</Typography> : ""}

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
              id='password' name='password' label='Password' type='password'
              autoComplete="current-password"
            />
              {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}


            <TextField
              margin="normal"
              required
              fullWidth
              id='password2' name='password2' label='Confirm Password' type='password'
                />
                 {server_error.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""}

                 <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
            {server_error.tc ? <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.tc[0]}</span> : ""}
     
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
            {isLoading ? <CircularProgress sx={{ mt: 3, mb: 2 }} /> : <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Create Account</Button>}
            </Grid>
            
            <Grid container>

              <Grid item xs>
                <NavLink to='/sendpasswordresetemail' variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
                 {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
</Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}


export default Registration;
