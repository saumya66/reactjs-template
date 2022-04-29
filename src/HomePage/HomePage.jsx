// import { Center  } from '@chakra-ui/react'
// import { Button, Text, useColorMode } from '@chakra-ui/react';

import { Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function HomePage() {
    const user = useSelector(state => state.auth)

    return (
        <Box h="100%" w="100%">
            <Text fontSize={50} fontWeight="bold" textAlign="center">Welcome to the app - {user?.email.split('@')[0]} </Text>
        </Box >
    )
}

export default HomePage;