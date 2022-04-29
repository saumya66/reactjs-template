import { useToast } from "@chakra-ui/react";

const ShowToast= ({status,title,description})=> {
    const toast = useToast()
    return toast({
    title: "title",
    description: "description",
    status: "success",
    duration: 2000,
    isClosable: true,
})
}
 
export {
    ShowToast
};