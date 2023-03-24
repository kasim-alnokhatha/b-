import { Button, CssBaseline, Grid, Typography, Link, Box, TextField, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../../redux/authSlice';
import { getToken, removeToken, getEmailVerify, removeEmailVerify } from '../../api/LocalStorageService';

import { useGetLoggedUserQuery } from '../../api/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../../redux/userSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEmailVerifyMutation, useResendEmailVerifyMutation } from '../../api/userAuthApi';
import { storeToken, storeEmailVerify } from '../../api/LocalStorageService';
import { setUserToken } from '../../redux/authSlice';
import { useSelector } from 'react-redux'

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
  const auth = useSelector(state => state.auth.access_token)
  const user = useSelector(state => state)

  // let { access_token } = getToken()
  // useEffect(() => {
  //   dispatch(setUserToken({ access_token: access_token }))
  // }, [access_token, dispatch])

  // if (isLogin) {
  //   history.push('/home');
  // }
  
  const { access_token } = getToken()
  // let { email_verified } = getEmailVerify()

  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const [server_error, setServerError] = useState({})
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [verify, setVerify] = useState({})


  const [userData, setUserData] = useState({
    email: "",
    name: "",
    email_verified: ""
  })

  useEffect(() => {
    console.log(auth);
    if (data && isSuccess) {
      console.log(data)
      setUserData({
        email: data.email,
        name: data.name,
        // email_verified: data.email_verified.toString(),
        email_verified: data.email_verified.toString(),
      })
      // storeToken(data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      // console.log(data.email_verified.toString())
      // if(data.email_verified.toString() == 'false'){
      //   console.log('go to verify email')
      //   navigate('/verify-email')
      // }
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
      console.log(data.token.access)
      dispatch(setUserToken({ access_token: data.token.access }))
    }
  }, [data, isSuccess, dispatch])

  useEffect(() => {
    // getUser()
    if(!auth) {
      navigate("/login");
    }
    console.log(auth)
  }, [])


const theme = createTheme();

const [verifyEmail] = useEmailVerifyMutation()
const [resendVerifyEmail] = useResendEmailVerifyMutation()


const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const actualData = {
    verifycode: data.get('verifycode')
  }
  // const res = await verifyEmail()
  const res = await verifyEmail({ actualData, access_token })
  console.log(res)
  if (res.error) {
    setServerError(res.error.data.errors)
  }
  if (res.data.email_verified == false) {
    setError(res.data.msg)
    console.log(res.data)
    // storeEmailVerify(res.data.email_verified.toString())
    // window.location.reload();
  }else{
    // let { access_token } = getToken()
    // let { email_verified } = getEmailVerify()
    // console.log(email_verified)
    // dispatch(setUserToken({ access_token: access_token }))
    // dispatch(setUserInfo({ email_verified: email_verified }))
    navigate('/dashboard')
  }
}

const resendVerify = async (e) => {
  e.preventDefault();
  const res = await resendVerifyEmail({ access_token })
  if (res.error) {
    setServerError(res.error.data.errors)
  }
  if (res.data) {
    console.log(res.data)
    setError('')
    setMessage(res.data.msg)
  } 
}

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
           Enter Your Email Verification Code.   
          </Typography>
          <Typography component="h1" variant="h5">
         
          </Typography>
          <Box component="form"  onSubmit={handleSubmit}  id='verify-form'  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="verifycode"
              label="Email Verification Code"
              name="verifycode"
              autoComplete="verifycode"
              autoFocus
              type="number"
            />     

            <Grid container>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Verify</Button>
              {message ? <Typography style={{ fontSize: 12, color: 'green' }}>{message}</Typography> : ""}
              {error ? <Typography style={{ fontSize: 12, color: 'red' }}>{error}</Typography> : ""}

              <Link underline='none' style={{cursor:'pointer'}} onClick={resendVerify}>Resend Verification Code?</Link>
            </Grid>

        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>

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
