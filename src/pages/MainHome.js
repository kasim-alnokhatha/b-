import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Chip,
    Stack,
    Typography,
    IconButton,
    Rating,
    Divider,
    Badge
  } from "@mui/material";
  import IosShareIcon from "@mui/icons-material/IosShare";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import FavoriteIcon from "@mui/icons-material/Favorite";

  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { unSetUserToken , setUserToken } from '../redux/authSlice';
  import { getToken,storeToken,  removeToken, getEmailVerify, removeEmailVerify, storeEmailVerify } from '../api/LocalStorageService';
  import ChangePassword from './auth/ChangePassword';
  import { useGetLoggedUserQuery } from '../api/userAuthApi';
  import { useEffect, useState } from 'react';
  import { setUserInfo, unsetUserInfo } from '../redux/userSlice';
  function ProductCard({
    imageUrl,
    title,
    bgcolor,
    ribbonText,
    description,
    rating,
    favorite,
    favoriteCount
  }) {
    return (
      <Card
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": {
            boxShadow: 4
          }
        }}
      >
        <CardMedia
          component="img"
          height="200px"
          alt=""
          image={imageUrl}
          sx={{ bgcolor: bgcolor }}
        />
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="span" fontWeight="bold" fontSize={23}>
              {title}
            </Typography>
            {ribbonText && (
              <Chip
                label={ribbonText}
                color={ribbonText === "Recommanded" ? "success" : "secondary"}
                size="small"
              />
            )}
          </Stack>
          <Rating name="read-only" value={rating} readOnly />
          <Typography fontSize={14} sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
          <Stack spacing={2} my={2}>
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Show {title}
              </Button>
              <IconButton aria-label="delete">
                <IosShareIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete">
                <Badge badgeContent={favoriteCount} color="primary">
                  {favorite ? (
                    <FavoriteIcon color="secondary" fontSize="inherit" />
                  ) : (
                    <FavoriteBorderIcon fontSize="inherit" />
                  )}
                </Badge>
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  export default function MainHome() {

    const d = 'false'
    const isVerified = localStorage.getItem('email_verified');


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
      
        if (data && isSuccess) {
          console.log(data)
          setUserData({
            email: data.email,
            name: data.name,
            // email_verified: data.email_verified.toString(),
            email_verified: d,
          })
          storeEmailVerify(d)
    
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
            // email_verified: data.email_verified.toString()
            email_verified: d,
          }))
        }
      }, [data, isSuccess, dispatch])















    let productId = 0;
    const products = [
      {
        id: productId++,
        title: "OfferToro",
        ribbonText: "HOT",
        rating: 4,
        favorite: true,
        favoriteCount: 5,
        description:
          "Complete tasks and earn Bucksify Tokens. They have a lot of survey routers available. Recommended to try out.",
        bgcolor: "darkslategrey",
        imageUrl:
          "https://res.cloudinary.com/faucetspro/image/upload/v1641051453/offertoro_dvf8lt.svg"
      },
      {
        id: productId++,
        title: "Adidas",
        description:
          "Complete tasks and earn Bucksify Tokens. They have a lot of survey routers available. Recommended to try out.",
        bgcolor: "White",
        imageUrl:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_Vit_FV3284_01_standard.jpg"
      },
      {
        id: productId++,
        title: "Adidas",
        ribbonText: "Recommanded",
        description:
          "Complete tasks and earn Bucksify Tokens. They have a lot of survey routers available. Recommended to try out.",
        bgcolor: "Blue Bird/Cloud White/Grey Two",
        imageUrl:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6236e45069734a6baa78ad5000834765_9366/NMD_R1_Shoes_Bla_GY1349_01_standard.jpg"
      }
    ];
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} py={10}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={4}>
              <ProductCard
                title={product.title}
                bgcolor={product.bgcolor}
                imageUrl={product.imageUrl}
                ribbonText={product.ribbonText}
                description={product?.description}
                rating={product?.rating}
                favorite={product?.favorite}
                favoriteCount={product?.favoriteCount}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  