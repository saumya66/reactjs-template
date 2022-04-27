import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {  Formik } from "formik";
import Cookies from 'js-cookie'

 import { setUser } from './authSlice';
import store from '../app/store';
import ToastMessage from '../components/toast';
import { useRegisterUserMutation } from './authApi';
import { signUpSchema } from '../app/validations';
import { useHistory} from 'react-router-dom';
import TextInput from '../components/TextInput';

const SignUp = ()=>{
 
    const history = useHistory();
    const [register, isLoading] = useRegisterUserMutation()
    const notify = (type, message) => {
        ToastMessage({ type, message });
    }
    const [signUpError, setSignUpError] =  useState()

    const handleSignUp = async(values,actions)=>{
        setSignUpError("")
        try{
            const userInfo = await register(values).unwrap()
            const date = new Date();
            let accessTokenExpireDate=  new Date(date.getTime() +(60*1000));
            let refreshTokenExpireDate=  new Date(date.getTime() +(86400*1000));
            Cookies.set("accessToken",userInfo?.tokens?.accessToken, {expires: accessTokenExpireDate})
            Cookies.set("refreshToken",userInfo?.tokens?.refreshToken,{expires: refreshTokenExpireDate})
            store.dispatch(setUser({isLoggedIn:true, userId: userInfo?.user?._id, email: userInfo?.user?.email }))
            notify("success","Welcome");
            history.push("/")
        }
        catch(err){
            console.log(err?.data?.message)
            setSignUpError(err?.data?.message)
            notify("error", "Invalid Credentials !")
        }
        actions.setSubmitting(false);
    }
    return(
        <Box 
            // sx={{
            // backgroundColor: "#ffffff",
            // opacity: 0.8,
            // backgroundImage: "radial-gradient(#444cf7 0.75px, #ffffff 0.75px)",
            // backgroundSize: "15px 15px"
            // }} 
            minH="100vh" minW="100vw" pt="60px" display="flex" alignItems="center" justifyContent="center">
            <Flex direction="column" w={["92vw", "68vw" , "48vw","36vw"]} borderRadius="10" h="600px" bg="white" boxShadow='xl' p="8">
            {/* <ToastContainer /> */}
                <Text fontSize="30px" color="brand.800" fontWeight="bold" mb={8}>Sign Up</Text>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={signUpSchema}
                  onSubmit={handleSignUp}
                > 
                {({handleSubmit, handleBlur, errors,touched,values,handleChange,isSubmitting}) => (
                <form>
                    <TextInput onChange={handleChange('email')} name='email' hand value={values.email} label='Email' placeholder="Enter email" error={errors.email}/>
                    <TextInput onBlur={handleBlur('password')} onChange={handleChange('password')} name='password' value={values.password} label='Password' placeholder="Enter password" error={errors.password}/>
                    {signUpError && <Text fontSize="12px" color="bad.primary" fontWeight="medium">{signUpError}</Text>}
                    <Button 
                        isLoading={isSubmitting}
                        my={8}
                        bgColor="brand.800"
                        color="white" 
                        w="100%"
                        isDisabled={isSubmitting} 
                        onClick={handleSubmit}
                    >Sign Up</Button>
                </form>
                )}
            </Formik>
            </Flex>
        </Box>
    )
}

export default SignUp;