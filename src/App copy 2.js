import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Profile from './pages/Profile';

import LogIn from "./pages/auth/LogIn";

import EmailVerification from "./pages/auth/EmailVerification";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/verify">
          <EmailVerification />
        </Route>
        <PrivateRoute exact path="/">
          <Profile />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
