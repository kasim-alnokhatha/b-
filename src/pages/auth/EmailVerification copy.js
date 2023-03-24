import { Button, CssBaseline, Grid, Typography, Link, Box, TextField, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../../reducer/authSlice';
import { getToken, removeToken, getEmailVerify, removeEmailVerify } from '../../api/LocalStorageService';

import { useGetLoggedUserQuery } from '../../api/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../../reducer/userSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';


const EmailVerification = () => {
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    removeEmailVerify()
    navigate('/login')
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  // let { email_verified } = getEmailVerify()

  const { data, isSuccess } = useGetLoggedUserQuery(access_token)


  const [userData, setUserData] = useState({
    email: "",
    name: "",
    email_verified: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    console.log(access_token);
    if (data && isSuccess) {
      // console.log(data.email_verified)

      setUserData({
        email: data.email,
        name: data.name,
        email_verified: data.email_verified.toString(),
      })
    }
  }, [data, isSuccess])

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        email_verified: data.email_verified.toString()
      }))
    }
  }, [data, isSuccess, dispatch])

const theme = createTheme();


  return<>
 <ThemeProvider theme={theme}>
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
          <Box component="form" id='login-form'  noValidate sx={{ mt: 1 }}>
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

            <Grid container>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Login</Button>
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

          
          </Box>
        </Box>

 </Container>
 </ThemeProvider>
  </>
};

export default EmailVerification;
