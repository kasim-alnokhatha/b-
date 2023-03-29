import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken , setUserToken } from '../redux/authSlice';
import { getToken,storeToken,  removeToken, getEmailVerify, removeEmailVerify } from '../api/LocalStorageService';
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../api/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../redux/userSlice';
import { useSelector } from "react-redux";


const Dashboard = () => {

  const auth = useSelector((state) => state.auth.access_token);
  // const token = useSelector(state => state.auth.access_token);
  // console.warn(access_token)
  
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


  

  const { data, error, isSuccess } = useGetLoggedUserQuery(access_token)

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    email_verified: ""
  })
  // Store User Data in Local State
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
    }
    if(error){
      alert('some thing went wrong');
      handleLogout()
    }
  }, [data, error, isSuccess])



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

  // useEffect(() => {
  //   if(userData.email_verified == 'false'){
  //         navigate('/verify-email')
  //   }
  //   if(auth == null){
  //         // navigate('/login')
  //   }
  // })


  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: {userData.email}</Typography>
        <Typography variant='h6'>Name: {userData.name}</Typography>
        <Typography variant='h6'>Emailverify: {userData.email_verified}</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={8}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;
