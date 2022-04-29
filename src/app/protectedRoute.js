import React from 'react';
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom'
import Cookies from 'js-cookie'
export const ProtectedRoute = ({component : Component,user,...rest})=>{
    const refreshToken = Cookies.get("refreshToken")
    console.log(refreshToken)
    return(
        <Route {...rest} 
            render = {props =>{
                if(refreshToken)
                 return <Component {...props}/>
                else {
                    return (
                    <Redirect to = {
                        {
                        pathname: '/auth/login',
                        state : {
                            from : props.location
                        }
                    }
                }/>
                )
            }
            }
        }
        />
    )
}