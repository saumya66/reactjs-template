import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TextInput from '../components/TextInput';
import { Formik } from "formik";
import { signUpSchema } from '../app/validations';
import { useLoginGoogleUserMutation, useLoginUserMutation } from './authApi';
import { setUser } from './authSlice';
import Cookies from 'js-cookie'
import store from '../app/store';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from "react-icons/fc"
import { useLocation } from 'react-router-dom';

const Login = ()=>{
    const refreshToken = Cookies.get("refreshToken")
    const history = useHistory();
    const [login] = useLoginUserMutation()
    const [googleLogin] = useLoginGoogleUserMutation()
    const toast = useToast()

    const handleGoogleLogin = async (googleData) => {
        try{
            const userInfo = await googleLogin(googleData.tokenId).unwrap()
            console.log(userInfo)
            let date = new Date();
            let accessTokenExpireDate=  new Date(date.getTime() +(60*1000));
            let refreshTokenExpireDate=  new Date(date.getTime() +(86400*1000));
            Cookies.set("accessToken",userInfo?.tokens?.accessToken, {expires: accessTokenExpireDate})
            Cookies.set("refreshToken",userInfo?.tokens?.refreshToken,{expires: refreshTokenExpireDate})
            store.dispatch(setUser({isLoggedIn:true, userId: userInfo?.user?._id, email: userInfo?.user?.email }))
            toast({
                title:  "Logged In" ,
                description: "Welcome to the app." ,
                status: "success",
                duration: 2000,
                isClosable: true,
            })        
            history.push("/")
        }
        catch(err){
            console.log(err)
            toast({
                title:  "Invalid Credentials" ,
                description: err?.data?.message ,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const [loginError, setLoginError] =  useState()

    const handleLogin = async(values,actions)=>{

        try{
            const userInfo = await login(values).unwrap()
            let date = new Date();
            let accessTokenExpireDate=  new Date(date.getTime() +(60*1000));
            let refreshTokenExpireDate=  new Date(date.getTime() +(86400*1000));
            Cookies.set("accessToken",userInfo?.tokens?.accessToken, {expires: accessTokenExpireDate})
            Cookies.set("refreshToken",userInfo?.tokens?.refreshToken,{expires: refreshTokenExpireDate})
            store.dispatch(setUser({isLoggedIn:true, userId: userInfo?.user?._id, email: userInfo?.user?.email }))
            toast({
                title:  "Logged In" ,
                description: "Welcome to the app." ,
                status: "success",
                duration: 2000,
                isClosable: true,
            })        
            history.push("/")
        }
        catch(err){
            console.log(err?.data?.message)
            setLoginError(err?.data?.message)
            toast({
                title:  "Invalid Credentials" ,
                description: "Please try again." ,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
        actions.setSubmitting(false);
    }
    // useEffect(()=>{
    //     refreshToken && history.push("/")
    // },[])
    return(
        <Box 
        h="100%" w="100%" pt="5%" display="flex" alignItems="center" justifyContent="center">
        <Flex direction="column" w={["92%", "68%" , "48%","36%"]} borderRadius="10" minH="500px" bg="bg" boxShadow='2xl' p="8">
            <Text fontSize="30px" color="brand.800" fontWeight="bold" mb={8}>Log In</Text>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={signUpSchema}
              onSubmit={handleLogin}
            > 
            {({handleSubmit, handleBlur, errors,touched,values,handleChange,isSubmitting}) => (
            <form>
                <TextInput onChange={handleChange('email')} name='email' hand value={values.email} label='Email' placeholder="Enter email" error={errors.email}/>
                <TextInput onBlur={handleBlur('password')} onChange={handleChange('password')} name='password' value={values.password} label='Password' placeholder="Enter password" error={errors.password}/>
                {loginError && <Text fontSize="12px" color="bad.primary" fontWeight="medium">{loginError}</Text>}
                <Button 
                    isLoading={isSubmitting}
                    my={8}
                    bgColor="brand.800"
                    color="white" 
                    w="100%"
                    isDisabled={isSubmitting} 
                    onClick={handleSubmit}
                >Log In</Button>
            </form>
            )}
        </Formik>
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                <Button onClick={renderProps.onClick} disabled={renderProps.disabled} leftIcon={<FcGoogle size={28} />}>Log In with Google</Button>
            )}
 
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
        />
        </Flex>
    </Box>
    )
}

export default Login;