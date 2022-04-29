import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import HomePage from './HomePage/HomePage';

function App() {
  const user = useSelector(state => state.auth)
 
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
          {user?.isLoggedIn ? <HomePage/> : <LandingPage /> }
        </Route> 
      </Switch>
    </div>
    </Router>
  );
}
 
export default App;