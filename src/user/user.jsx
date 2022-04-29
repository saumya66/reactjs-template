import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function UserPage() {
    const user = useSelector(state => state.auth)

    return (
        <Box h="100%" w="100%">
            <Text fontSize={50} fontWeight="bold" textAlign="center"> User : {user?.email?.split('@')[0]}</Text>
        </Box >
    )
}

export default UserPage;