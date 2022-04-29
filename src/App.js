import './App.css';
import {
 
    Switch,
    Route,
} from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import HomePage from './HomePage/HomePage';
import UserPage from './user/user';
import { ProtectedRoute } from './app/protectedRoute';
import store from './app/store';
import { useGetUserMutation } from './user/userAPI';
import { useLocation } from 'react-router-dom';
import { logout, setUser } from './auth/authSlice';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
    const user = useSelector(state => state.auth)
  const location = useLocation();
  const history = useHistory();
  const [getUser]  = useGetUserMutation()

  const handleIsLoggedIn = async() => {     
    try{
        const refreshToken = Cookies.get("refreshToken")
        if(!refreshToken){
            store.dispatch(logout())
            if(location.pathname != '/auth/signup' && location.pathname != '/auth/login')history.push("/")
            return
        }
        if(refreshToken){   // - sets a new access token if expired in interceptor - used to get the user's info
           const user = await getUser().unwrap()   
           console.log(user)
           store.dispatch(setUser({isLoggedIn:true, userId: user?.user?.id, email: user?.user?.email }))
        }
        if(location.pathname === '/auth/signup' || location.pathname === '/auth/login')history.push("/")
        }
    catch(err){
        console.log(err)
    }
}
useEffect(()=>{
    handleIsLoggedIn()
},[])
  return (
    <div className="App">
      <Navbar user/>
      <Switch> 
        <ProtectedRoute exact path="/user" user={user} component={UserPage}/> 
        <Route exact path="/auth/login"> 
          <Login /> 
        </Route> 
        <Route exact path="/auth/signup"> 
          <SignUp />
        </Route> 
        <Route exact path="/"> 
          {user?.isLoggedIn ? <HomePage/> : <LandingPage /> }
        </Route> 
      </Switch>
    </div>
  );
}
 
export default App;