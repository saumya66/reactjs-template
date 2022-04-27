import './App.css';
 import { Button, Text, useColorMode } from '@chakra-ui/react';

 import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Navbar from './components/Navbar';

    function App() {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch> 
          <Route path="/auth/login"> 
      <Login /> 
      </Route> 
      <Route path="/auth/signup"> 
      <SignUp /> 
      </Route> 
      <Route path="/"> 
      <LandingPage /> 
      </Route> 
      </Switch>

    </div>
    </Router>
  );
}
 
export default App;