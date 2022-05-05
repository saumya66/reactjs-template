import { Box, Center, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
export const ProtectedRoute = ({component : Component,user,...rest})=>{
    return(
        <Route {...rest} 
            render = {props =>{
                if(user?.isLoggedIn == null){
                    return <Center>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='brand.800'
                            size='xl'
                        />
                    </Center>
                }
                else if(user?.isLoggedIn)
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
