import {useEffect, useState} from 'react';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginRegOld";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";

import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/auth/EmailVerification";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import "./App.css";
import NotFound from './components/error/NotFound';

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Footer from "./components/footer/Footer";

import AppsHome from "./pages/apps/AppsHome";
import NotesPrivacy from './pages/apps/notes/NotesPrivacy';
import NotesHome from "./pages/apps/notes/NotesHome";
import WhatsappGoPrivacy from './pages/apps/whatsappgo/WhatsappGoPrivacy';
import CommingSoon from "./components/commingsoon/CommingSoon";
import ReactGA from 'react-ga';

import Profile from './pages/Profile';

const TRACKING_ID = "G-TBWLWJF6PG"; 
ReactGA.initialize(TRACKING_ID);

function App() {
  const { access_token } = useSelector(state => state.auth)
  const { email_verified } = useSelector(state => state.user)
  
console.log(email_verified)
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LogIn />} />
            <Route path="login3" element={!access_token ? <LogIn /> : <Navigate to="/dashboard" />} />
            <Route path="login2" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="signup" element={!access_token ? <SignUp /> : <Navigate to="/dashboard" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />


            <Route path="help/terms-and-conditions" element={<Terms />} />
            <Route path="help/privacy-and-policy" element={<Privacy />} />


            {/* Apps page  */}
            <Route path="apps" element={<AppsHome />} />

            <Route path="applications/notes/privacy" element={<NotesPrivacy />} />
            <Route path="apps/notes/privacy" element={<NotesPrivacy />} />
            <Route path="apps/notes" element={<NotesHome />} />
            {/* <Route path="apps/notes" element={<Privacy />} />
            <Route path="apps/notes" element={<Privacy />} /> */}

            <Route path="apps/whatsappgo/privacy" element={<WhatsappGoPrivacy />} />
            <Route path="applications/whatsappgo/privacy" element={<WhatsappGoPrivacy />} />
       
            <Route path="verify-email" element={<EmailVerification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/profile" element={<Profile />} /> */}

          <Route path="/profile" element={access_token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
          {/* <Route path="/verify-email" element={access_token ? <EmailVerification /> : <Navigate to="/login" />} /> */}
          {/* <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} /> */}
          {/* <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} /> */}
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
