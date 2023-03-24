// import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function PrivateRoute({ component: Component, ...rest }) {
//   const isAuthenticated = useSelector((state) => state.auth.access_token);
//   const isVerified = useSelector((state) => state.user.email_verified);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           isVerified == 'true' ? (
//             <Component {...props} />
//           ) : (
//             <Redirect to="/verify-email" />
//           )
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// }


import { useSelector } from 'react-redux';


import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {

  const isAuthenticated = useSelector((state) => state.auth.access_token);
  console.log(isAuthenticated)
  // const isAuthenticated = useSelector((state) => state.auth.access_token);
  const isVerified = useSelector((state) => state.user.email_verified);
  // const isVerified = true;
  // let auth = {'token':false}
return (
  isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  // isAuthenticated && isVerified ? 
  //   <Outlet/>
  //  :
  //  isAuthenticated ? 
  //  <Navigate to="/verify-email" />
  //  :
  //   <Navigate to='/login'/>

  // isAuthenticated ? (
  //   isVerified == true ? (
  //     <Outlet/>
  //   ) : (
  //     <Navigate to="/verify-email" />
  //   )
  // ) : (
  //   <Navigate to="/login" />

  // )
  
  
  )
}



export default PrivateRoutes
