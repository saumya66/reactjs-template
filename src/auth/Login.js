import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import { Formik } from "formik";
import { signUpSchema } from '../app/validations';
import { useLoginUserMutation } from './authApi';
import { setUser } from './authSlice';
import Cookies from 'js-cookie'
import store from '../app/store';
import ToastMessage from '../components/toast';
import { useHistory } from 'react-router-dom';

const Login = ()=>{
    const history = useHistory();
    const [login] = useLoginUserMutation()
    const notify = (type, message) => {
        ToastMessage({ type, message });
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
            notify("success","Logged In");
            history.push("/")
        }
        catch(err){
            console.log(err?.data?.message)
            setLoginError(err?.data?.message)
            notify("error", "Invalid Credentials !")
        }
        actions.setSubmitting(false);
    }
    return(
        <Box 
        minH="100vh" minW="100vw" pt="60px" display="flex" alignItems="center" justifyContent="center">
        <Flex direction="column" w={["92vw", "68vw" , "48vw","36vw"]} borderRadius="10" h="600px" bg="white" boxShadow='xl' p="8">
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
        </Flex>
    </Box>
    )
}

export default Login;