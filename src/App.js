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
import { ProtectedRoute } from './app/ProtectedRoute';
import store from './app/store';
import { useGetUserMutation } from './user/userAPI';
import { useLocation } from 'react-router-dom';
import { logout, setUser } from './auth/authSlice';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import PublicRoute from './app/PublicRoute';
import { Redirect } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';

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
            // if(location.pathname != '/auth/signup' && location.pathname != '/auth/login')history.push("/")
            return
        }
        if(refreshToken){   // - sets a new access token if expired in interceptor - used to get the user's info
           const user = await getUser().unwrap()   
           console.log(user)
           store.dispatch(setUser({isLoggedIn:true, userId: user?.user?.id, email: user?.user?.email }))
        }
        // if(location.pathname === '/auth/signup' || location.pathname === '/auth/login')history.push("/")
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
        <PublicRoute path="/auth/login" user={user} component={Login}/> 
        <PublicRoute path="/auth/signup" user={user} component={SignUp}/> 
        <PublicRoute path="/auth/login" user={user} component={Login}/> 
        <Route exact path="/"> 
          {user?.isLoggedIn == null ?
              <Center>
                  <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='brand.800'
                      size='xl'
                  />
              </Center>
          : user?.isLoggedIn ? <HomePage/> 
          : <LandingPage /> 
          }
        </Route> 
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  );
}
 
export default App;