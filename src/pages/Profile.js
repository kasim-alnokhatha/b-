import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getToken,storeToken,  removeToken, getEmailVerify, removeEmailVerify } from '../api/LocalStorageService';
import { useGetLoggedUserQuery } from '../api/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
// import { setUserToken } from '../../redux/authSlice';

import { setUserToken } from '../redux/authSlice';

function Profile() {

    const auth = useSelector((state) => state.auth.access_token);
    
  const { access_token } = getToken()

//   console.log(access_token)

  const { data, isSuccess } = useGetLoggedUserQuery(access_token)

  const dispatch = useDispatch()


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


  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src="https://picsum.photos/200" alt="Profile picture" />
          <Box ml={2}>
            <Typography variant="h5">John Doe {auth}</Typography>
            <Typography variant="subtitle1" color="textSecondary">Software Engineer</Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Email:</Typography>
            <Typography variant="body1">johndoe@example.com</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Phone:</Typography>
            <Typography variant="body1">555-555-5555</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Address:</Typography>
            <Typography variant="body1">123 Main St, Anytown USA</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Birthday:</Typography>
            <Typography variant="body1">January 1, 1990</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">Edit Profile</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Profile;
