import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';

import LoginReg from "./pages/auth/LoginRegOld";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";


import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/auth/EmailVerification";


import Profile from './pages/Profile';
import MainHome from './pages/MainHome';


function App() {
  return (
    <Router>
        <Routes>

       <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />


          {/* <Route path="*" element={<NotFound />} /> */}


          <Route element={<PrivateRoutes/>}>
              <Route path='/profile' element={<Profile/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="" element={<MainHome />} />
              <Route path="verify-email" element={<EmailVerification />} />


              {/* <Route path='/products' element={<Products/>} /> */}
          </Route>


          {/* <Route path='' element={<LogIn/>}/> */}
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
    </Router>
  );
}

export default App;
